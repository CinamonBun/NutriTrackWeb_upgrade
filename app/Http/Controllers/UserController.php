<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
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

    public function update(Request $request, \App\Models\User $user)
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

        if ($actor->role === 'admin' && $user->role === 'admin' && $actor->id !== $user->id) {
            \App\Models\AdminAuditLog::create([
                'actor_id' => $actor->id,
                'target_id' => $user->id,
                'action' => 'updated',
                'changes' => [
                    'old' => $oldData,
                    'new' => $validated,
                ]
            ]);
        }

        if ($actor->id !== $user->id) {
            Cache::forget($this->actionVerifiedKey($actor->id, $user->id, 'edit'));
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(\App\Models\User $user)
    {
        if ($user->id === auth()->id()) {
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

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function sendPasswordReset(\App\Models\User $user)
    {
        $status = \Illuminate\Support\Facades\Password::broker()->sendResetLink(
            ['email' => $user->email]
        );

        if ($status === \Illuminate\Support\Facades\Password::RESET_LINK_SENT) {
            return redirect()->back()->with('success', 'Password reset link sent.');
        }

        return redirect()->back()->withErrors(['error' => 'Unable to send password reset link.']);
    }

    public function sendPasswordResetCode(\App\Models\User $user)
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

    public function resetPasswordWithCode(Request $request, \App\Models\User $user)
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

        return response()->json(['message' => 'Password has been reset.']);
    }

    public function sendActionVerificationCode(Request $request, \App\Models\User $user)
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

    public function verifyActionCode(Request $request, \App\Models\User $user)
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
