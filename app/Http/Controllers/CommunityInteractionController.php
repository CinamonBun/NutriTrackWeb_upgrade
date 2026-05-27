<?php

namespace App\Http\Controllers;

use App\Models\CommunityPost;
use App\Models\CommunityPostComment;
use App\Models\CommunityReport;
use Illuminate\Http\Request;

class CommunityInteractionController extends Controller
{
    public function toggleLike(CommunityPost $post)
    {
        $userId = auth()->id();
        $like = $post->likes()->where('user_id', $userId)->first();

        if ($like) {
            $like->delete();
            $post->decrement('likes_count');
        } else {
            $post->likes()->create(['user_id' => $userId]);
            $post->increment('likes_count');
        }

        return back();
    }

    public function toggleSave(CommunityPost $post)
    {
        $userId = auth()->id();
        $save = $post->saves()->where('user_id', $userId)->first();

        if ($save) {
            $save->delete();
        } else {
            $post->saves()->create(['user_id' => $userId]);
        }

        return back();
    }

    public function storeComment(Request $request, CommunityPost $post)
    {
        $request->validate([
            'content' => 'required|string|max:500',
        ]);

        $post->comments()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        return back()->with('success', 'Komentar ditambahkan!');
    }

    public function storeReport(Request $request)
    {
        $request->validate([
            'reportable_type' => 'required|in:post,comment',
            'reportable_id' => 'required|integer',
            'reason' => 'required|in:' . implode(',', CommunityReport::REASONS),
            'details' => 'nullable|string|max:500',
        ]);

        $model = match ($request->reportable_type) {
            'post' => CommunityPost::visible()->findOrFail($request->reportable_id),
            'comment' => CommunityPostComment::where('status', 'active')->findOrFail($request->reportable_id),
        };

        $morphClass = $model::class;

        $exists = CommunityReport::where('reporter_id', auth()->id())
            ->where('reportable_type', $morphClass)
            ->where('reportable_id', $model->id)
            ->exists();

        if ($exists) {
            return back()->with('error', 'Anda sudah melaporkan konten ini.');
        }

        CommunityReport::create([
            'reporter_id' => auth()->id(),
            'reportable_type' => $morphClass,
            'reportable_id' => $model->id,
            'reason' => $request->reason,
            'details' => $request->details,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Laporan terkirim. Tim moderasi akan meninjau.');
    }
}
