<?php

namespace App\Http\Controllers;

use App\Models\AdminAuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    private function shouldLogAdminAction(User $actor, User $target): bool
    {
        return $actor->role === 'admin'
            && $actor->id !== $target->id;
    }

    private function logAdminAudit(User $actor, User $target, string $action, ?array $changes = null): void
    {
        if (!$this->shouldLogAdminAction($actor, $target)) {
            return;
        }

        AdminAuditLog::create([
            'actor_id' => $actor->id,
            'target_id' => $target->id,
            'action' => $action,
            'changes' => $changes,
        ]);
    }

    private function actionVerifiedKey(int $actorId, int $targetId, string $action): string
    {
        return "user_action_verified_{$actorId}_for_{$targetId}_{$action}";
    }

    private function actionCodeKey(int $actorId, int $targetId, string $action): string
    {
        return "user_action_code_{$actorId}_for_{$targetId}_{$action}";
    }

    public function index()
    {
        $users = \App\Models\User::orderBy('created_at', 'desc')->get();
        return inertia('Users/Index', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,user',
        ]);

        $validated['password'] = \Illuminate\Support\Facades\Hash::make($validated['password']);

        \App\Models\User::create($validated);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,user',
        ]);

        $actor = auth()->user();

        if (!$actor || $actor->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($actor->id !== $user->id) {
            $isVerified = Cache::get($this->actionVerifiedKey($actor->id, $user->id, 'edit'));
            if (!$isVerified) {
                return response()->json([
                    'requires_verification' => true,
                    'action' => 'edit',
                    'message' => 'Verification required to edit this user.',
                ], 403);
            }
        }

        $oldData = $user->only(['name', 'email', 'role']);
        $user->update($validated);

        $changedFields = [];
        foreach ($validated as $field => $newValue) {
            if (array_key_exists($field, $oldData) && $oldData[$field] !== $newValue) {
                $changedFields[] = $field;
            }
        }
        $newData = $user->only(['name', 'email', 'role']);

        $this->logAdminAudit($actor, $user, "Updated", [
            'changed_fields' => $changedFields,
            'old' => $oldData,
            'new' => $newData,
        ]);

        if ($actor->id !== $user->id) {
            Cache::forget($this->actionVerifiedKey($actor->id, $user->id, 'edit'));
        }

        if ($request->wantsJson()) {
            return response()->json(['message' => 'User updated successfully.']);
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            if (request()->wantsJson()) {
                return response()->json(['message' => 'You cannot delete yourself.'], 403);
            }
            return redirect()->back()->withErrors(['error' => 'You cannot delete yourself.']);
        }

        $actor = auth()->user();
        if (!$actor || $actor->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = request()->validate([
            'password' => 'required|string',
        ]);

        if (!Hash::check($validated['password'], $actor->password)) {
            return response()->json(['message' => 'Invalid password.'], 422);
        }

        $deletedUserSnapshot = $user->only(['id', 'name', 'email', 'role']);
        $this->logAdminAudit($actor, $user, "Deleted", [
            'deleted_user' => $deletedUserSnapshot,
        ]);

        $user->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'User deleted successfully.']);
        }

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function sendPasswordReset(User $user)
    {
        $status = \Illuminate\Support\Facades\Password::broker()->sendResetLink(
            ['email' => $user->email]
        );

        if ($status === \Illuminate\Support\Facades\Password::RESET_LINK_SENT) {
            return redirect()->back()->with('success', 'Password reset link sent.');
        }

        return redirect()->back()->withErrors(['error' => 'Unable to send password reset link.']);
    }

    public function sendPasswordResetCode(User $user)
    {
        $actor = auth()->user();
        if (!$actor || $actor->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $cacheKey = "password_reset_code_for_{$user->id}";
        Cache::put($cacheKey, $code, now()->addMinutes(15));

        try {
            Mail::to($user->email)->send(new \App\Mail\PasswordResetCodeMail($code, $actor->name ?? 'Admin'));
        } catch (\Throwable $e) {
            report($e);
            return response()->json([
                'message' => 'Failed to send email. Please check mail configuration (SMTP) and try again.',
            ], 500);
        }

        return response()->json(['message' => 'Password reset code sent.']);
    }

    public function resetPasswordWithCode(Request $request, User $user)
    {
        $actor = auth()->user();
        if (!$actor || $actor->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'code' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $cacheKey = "password_reset_code_for_{$user->id}";
        $cachedCode = Cache::get($cacheKey);

        if (!$cachedCode || $cachedCode !== $validated['code']) {
            return response()->json(['message' => 'Invalid or expired verification code.'], 422);
        }

        Cache::forget($cacheKey);
        $user->forceFill(['password' => Hash::make($validated['password'])])->save();
        $this->logAdminAudit($actor, $user, "Changed password", [
            'status' => 'success',
        ]);

        return response()->json(['message' => 'Password has been reset.']);
    }

    public function sendActionVerificationCode(Request $request, User $user)
    {
        $actor = auth()->user();
        if (!$actor || $actor->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'action' => 'required|string|in:edit',
        ]);

        if ($user->id === $actor->id) {
            return response()->json(['message' => 'Action not allowed.'], 422);
        }

        $action = $validated['action'];
        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        Cache::put($this->actionCodeKey($actor->id, $user->id, $action), $code, now()->addMinutes(15));

        try {
            Mail::to($user->email)->send(new \App\Mail\UserActionVerificationMail(
                code: $code,
                requestedBy: $actor->name ?? 'Admin',
                action: $action
            ));
        } catch (\Throwable $e) {
            report($e);
            return response()->json([
                'message' => 'Failed to send email. Please check mail configuration (SMTP) and try again.',
            ], 500);
        }

        return response()->json(['message' => 'Verification code sent.']);
    }

    public function verifyActionCode(Request $request, User $user)
    {
        $actor = auth()->user();
        if (!$actor || $actor->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'action' => 'required|string|in:edit',
            'code' => 'required|string|size:6',
        ]);

        if ($user->id === $actor->id) {
            return response()->json(['message' => 'Action not allowed.'], 422);
        }

        $action = $validated['action'];
        $cacheKey = $this->actionCodeKey($actor->id, $user->id, $action);
        $cachedCode = Cache::get($cacheKey);
        if (!$cachedCode || $cachedCode !== $validated['code']) {
            return response()->json(['message' => 'Invalid or expired verification code.'], 422);
        }

        Cache::forget($cacheKey);
        Cache::put($this->actionVerifiedKey($actor->id, $user->id, $action), true, now()->addMinutes(15));

        return response()->json(['message' => 'Verification successful.']);
    }
}
