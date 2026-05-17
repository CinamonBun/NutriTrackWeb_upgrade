<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Fire standard Laravel Registered event, which automatically sends verification email
        event(new Registered($user));

        return response()->json([
            'message' => 'Registration successful. A verification link has been sent to your email.',
            'user' => $user,
        ], 201);
    }

    public function resendVerification(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        // Send standard Laravel verification email
        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification link resent successfully.',
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = Auth::user();

        // Use Laravel's default email verification check
        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Please verify your email first.'
            ], 403);
        }

        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // USER
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil'
        ]);
    }

    public function getProfile(Request $request)
    {
        $user = $request->user();

        $profile = $user->profile;

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'message' => 'Profile fetched successfully',
            'data' => $profile,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'tinggi_badan' => 'nullable|numeric|min:0',
            'berat_badan' => 'nullable|numeric|min:0',
            'lingkar_pinggang' => 'nullable|numeric|min:0',
            'lingkar_pinggul' => 'nullable|numeric|min:0',
            'jenis_kelamin' => 'nullable|in:L,P',
            'usia' => 'nullable|integer|min:0',
        ]);

        $user = $request->user();

        $profile = $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only([
                'tinggi_badan',
                'berat_badan',
                'lingkar_pinggang',
                'lingkar_pinggul',
                'jenis_kelamin',
                'usia',
            ])
        );

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => $profile,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $otp = rand(100000, 999999);

        $user->update([
            'reset_otp' => $otp,
            'reset_otp_expires_at' => Carbon::now()->addMinutes(10),
        ]);

        $resend = \Resend::client(config('services.resend.key'));

        $resend->emails->send([
            'from' => 'NutriTrack <onboarding@resend.dev>',
            'to' => [$user->email],
            'subject' => 'Reset Password OTP',
            'html' => "<h1>Your Reset OTP: $otp</h1><p>Valid for 10 minutes</p>"
        ]);

        return response()->json([
            'message' => 'Reset OTP sent to email'
        ]);
    }

    public function verifyResetOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->reset_otp !== $request->otp) {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }

        if (Carbon::now()->gt($user->reset_otp_expires_at)) {
            return response()->json(['message' => 'OTP expired'], 400);
        }

        return response()->json([
            'message' => 'OTP verified. You can reset password now.'
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->reset_otp !== $request->otp) {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }

        if (Carbon::now()->gt($user->reset_otp_expires_at)) {
            return response()->json(['message' => 'OTP expired'], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
            'reset_otp' => null,
            'reset_otp_expires_at' => null,
        ]);

        return response()->json([
            'message' => 'Password reset successfully'
        ]);
    }
}
