<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminVerificationController extends Controller
{
    public function send(\Illuminate\Http\Request $request, \App\Models\User $user)
    {
        $actor = auth()->user();

        if ($actor->role !== 'admin' || $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $code = str_pad((string)random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $cacheKey = "admin_verification_code_{$actor->id}_for_{$user->id}";
        \Illuminate\Support\Facades\Cache::put($cacheKey, $code, now()->addMinutes(15));

        \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\AdminVerificationMail($code));

        return response()->json(['message' => 'Verification code sent to target admin.']);
    }

    public function verify(\Illuminate\Http\Request $request, \App\Models\User $user)
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $actor = auth()->user();
        $cacheKey = "admin_verification_code_{$actor->id}_for_{$user->id}";
        $cachedCode = \Illuminate\Support\Facades\Cache::get($cacheKey);

        if (!$cachedCode || $cachedCode !== $request->code) {
            return response()->json(['message' => 'Invalid or expired verification code.'], 422);
        }

        \Illuminate\Support\Facades\Cache::forget($cacheKey);
        \Illuminate\Support\Facades\Cache::put("admin_verified_{$actor->id}_for_{$user->id}", true, now()->addMinutes(15));

        return response()->json(['message' => 'Verification successful.']);
    }
}
