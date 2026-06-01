<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminAuditLog;
use App\Models\CommunityGuideline;
use App\Models\CommunityPost;
use App\Models\CommunityPostComment;
use App\Models\CommunityReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityModerationController extends Controller
{
    private function ensureAdmin(): void
    {
        $user = auth()->user();
        if (!$user || $user->role !== 'admin') {
            abort(403, 'Unauthorized.');
        }
    }

    private function logModeration(string $action, ?int $targetUserId, array $changes): void
    {
        $actor = auth()->user();
        if (!$actor || !$targetUserId || $actor->id === $targetUserId) {
            return;
        }

        AdminAuditLog::create([
            'actor_id' => $actor->id,
            'target_id' => $targetUserId,
            'action' => $action,
            'changes' => $changes,
        ]);
    }

    public function index(Request $request)
    {
        $this->ensureAdmin();

        $postsQuery = CommunityPost::with(['user:id,name,email', 'moderator:id,name'])
            ->withCount(['comments', 'likes', 'reports']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $postsQuery->where(function ($q) use ($search) {
                $q->where('content', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $posts = $postsQuery->latest()->paginate(10)->withQueryString();

        $reports = CommunityReport::with(['reporter:id,name', 'reviewer:id,name'])
            ->where('status', 'pending')
            ->latest()
            ->get()
            ->map(function (CommunityReport $report) {
                $reportable = $report->reportable;
                $payload = [
                    'id' => $report->id,
                    'reason' => $report->reason,
                    'details' => $report->details,
                    'status' => $report->status,
                    'created_at' => $report->created_at,
                    'reporter' => $report->reporter,
                    'reportable_type' => class_basename($report->reportable_type),
                    'reportable_id' => $report->reportable_id,
                    'content_preview' => null,
                    'author_name' => null,
                ];

                if ($reportable instanceof CommunityPost) {
                    $reportable->loadMissing('user:id,name');
                    $payload['content_preview'] = \Illuminate\Support\Str::limit($reportable->content, 120);
                    $payload['author_name'] = $reportable->user?->name;
                } elseif ($reportable instanceof CommunityPostComment) {
                    $reportable->loadMissing('user:id,name');
                    $payload['content_preview'] = \Illuminate\Support\Str::limit($reportable->content, 120);
                    $payload['author_name'] = $reportable->user?->name;
                }

                return $payload;
            });

        $guidelines = CommunityGuideline::orderBy('sort_order')->get();

        return Inertia::render('Admin/Community/Index', [
            'posts' => $posts,
            'reports' => $reports,
            'guidelines' => $guidelines,
            'stats' => [
                'total_posts' => CommunityPost::count(),
                'hidden_posts' => CommunityPost::where('status', 'hidden')->count(),
                'removed_posts' => CommunityPost::where('status', 'removed')->count(),
                'pending_reports' => CommunityReport::where('status', 'pending')->count(),
            ],
            'reasonLabels' => [
                'spam' => 'Spam',
                'harassment' => 'Pelecehan',
                'misinformation' => 'Informasi menyesatkan',
                'inappropriate' => 'Konten tidak pantas',
                'other' => 'Lainnya',
            ],
        ]);
    }

    public function updatePost(Request $request, CommunityPost $post)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'status' => 'required|in:active,hidden,removed',
            'moderation_note' => 'nullable|string|max:500',
        ]);

        $oldStatus = $post->status;
        $post->update([
            'status' => $validated['status'],
            'moderation_note' => $validated['moderation_note'] ?? null,
            'moderated_by' => auth()->id(),
            'moderated_at' => now(),
        ]);

        $this->logModeration('Moderated Post', $post->user_id, [
            'post_id' => $post->id,
            'old' => $oldStatus,
            'new' => $validated['status'],
            'note' => $validated['moderation_note'] ?? null,
        ]);

        return back()->with('success', 'Status postingan diperbarui.');
    }

    public function destroyPost(CommunityPost $post)
    {
        $this->ensureAdmin();

        $authorId = $post->user_id;
        $postId = $post->id;

        $post->delete();

        $this->logModeration('community.post.deleted', $authorId, [
            'post_id' => $postId,
        ]);

        return back()->with('success', 'Postingan dihapus permanen.');
    }

    public function updateComment(Request $request, CommunityPostComment $comment)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'status' => 'required|in:active,hidden',
        ]);

        $oldStatus = $comment->status;
        $comment->update(['status' => $validated['status']]);

        $this->logModeration('community.comment.moderated', $comment->user_id, [
            'comment_id' => $comment->id,
            'post_id' => $comment->community_post_id,
            'old' => $oldStatus,
            'new' => $validated['status'],
        ]);

        return back()->with('success', 'Status komentar diperbarui.');
    }

    public function destroyComment(CommunityPostComment $comment)
    {
        $this->ensureAdmin();

        $authorId = $comment->user_id;
        $commentId = $comment->id;

        $comment->delete();

        $this->logModeration('community.comment.deleted', $authorId, [
            'comment_id' => $commentId,
        ]);

        return back()->with('success', 'Komentar dihapus.');
    }

    public function resolveReport(Request $request, CommunityReport $report)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'status' => 'required|in:reviewed,dismissed',
            'admin_notes' => 'nullable|string|max:500',
            'hide_content' => 'boolean',
        ]);

        $report->update([
            'status' => $validated['status'],
            'admin_notes' => $validated['admin_notes'] ?? null,
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        if (!empty($validated['hide_content']) && $report->reportable) {
            $reportable = $report->reportable;
            if ($reportable instanceof CommunityPost) {
                $reportable->update([
                    'status' => 'hidden',
                    'moderation_note' => $validated['admin_notes'] ?? 'Disembunyikan setelah laporan',
                    'moderated_by' => auth()->id(),
                    'moderated_at' => now(),
                ]);
            } elseif ($reportable instanceof CommunityPostComment) {
                $reportable->update(['status' => 'hidden']);
            }
        }

        return back()->with('success', 'Laporan ditangani.');
    }

    public function storeGuideline(Request $request)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'icon' => 'nullable|string|max:100',
            'content' => 'required|string|max:500',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        CommunityGuideline::create([
            'icon' => $validated['icon'] ?? 'fas fa-info-circle',
            'content' => $validated['content'],
            'sort_order' => $validated['sort_order'] ?? (CommunityGuideline::max('sort_order') + 1),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Pedoman komunitas ditambahkan.');
    }

    public function updateGuideline(Request $request, CommunityGuideline $guideline)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'icon' => 'nullable|string|max:100',
            'content' => 'required|string|max:500',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $guideline->update($validated);

        return back()->with('success', 'Pedoman komunitas diperbarui.');
    }

    public function destroyGuideline(CommunityGuideline $guideline)
    {
        $this->ensureAdmin();

        $guideline->delete();

        return back()->with('success', 'Pedoman komunitas dihapus.');
    }
}
