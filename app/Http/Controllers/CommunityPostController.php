<?php

namespace App\Http\Controllers;

use App\Models\CommunityGuideline;
use App\Models\CommunityPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityPostController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();
        $tag    = $request->query('tag');
        $search = $request->query('search');

        $posts = CommunityPost::visible()
            ->with(['user:id,name', 'comments' => function ($q) {
                $q->where('status', 'active')->with('user:id,name');
            }])
            ->withExists([
                'likes as is_liked' => function ($query) use ($userId) {
                    if ($userId) {
                        $query->where('user_id', $userId);
                    } else {
                        $query->whereRaw('1 = 0');
                    }
                },
                'saves as is_saved' => function ($query) use ($userId) {
                    if ($userId) {
                        $query->where('user_id', $userId);
                    } else {
                        $query->whereRaw('1 = 0');
                    }
                },
            ])
            ->when($tag, fn($q) => $q->where('tag', $tag))
            ->when($search, fn($q) => $q->where('content', 'like', "%{$search}%"))
            ->latest()
            ->get();

        $guidelines = CommunityGuideline::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['icon', 'content']);

        return Inertia::render('Community', [
            'posts'         => $posts,
            'activeTag'     => $tag,
            'searchQuery'   => $search,
            'guidelines'    => $guidelines,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'tag'     => 'nullable|string|max:50',
        ]);

        CommunityPost::create([
            'user_id'     => auth()->id(),
            'content'     => $request->content,
            'tag'         => $request->tag ?: null,
            'likes_count' => 0,
        ]);

        return redirect()->back()->with('success', 'Post created successfully!');
    }
}
