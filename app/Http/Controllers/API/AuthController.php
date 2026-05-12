<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendOtpMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Resend;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $otp = rand(100000, 999999);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'otp_code' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(10),
        ]);

        // 🔥 SEND EMAIL VIA RESEND
        Http::withHeaders([
            'Authorization' => 'Bearer ' . env('RESEND_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.resend.com/emails', [
            'from' => 'NutriTrack <rahmatprayogo@gmail.com>',
            'to' => [$user->email],
            'subject' => 'Your OTP Code',
            'html' => "
            <h2>Verify Your Email</h2>
            <p>Your OTP code is:</p>
            <h1>$otp</h1>
            <p>This code will expire in 10 minutes.</p>
        ",
        ]);

        return response()->json([
            'message' => 'Register successful. OTP sent via email.',
        ], 201);
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->email_verified_at) {
            return response()->json(['message' => 'Already verified'], 400);
        }

        $otp = rand(100000, 999999);

        $user->update([
            'otp_code' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(10),
        ]);

        $resend = Resend::client(config('services.resend.key'));

        $resend->emails->send([
            'from' => 'NutriTrack <rahmatprayogo@gmail.com>',
            'to' => [$user->email],
            'subject' => 'Your OTP Code',
            'html' => "<h1>OTP: $otp</h1>"
        ]);

        return response()->json([
            'message' => 'OTP resent successfully',
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        if ($user->otp_code !== $request->otp) {
            return response()->json([
                'message' => 'Invalid OTP'
            ], 400);
        }

        if (Carbon::now()->gt($user->otp_expires_at)) {
            return response()->json([
                'message' => 'OTP expired'
            ], 400);
        }

        $user->update([
            'email_verified_at' => now(),
            'otp_code' => null,
            'otp_expires_at' => null,
        ]);

        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'message' => 'Email verified successfully',
            'token' => $token,
            'user' => $user,
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

        if (!$user->email_verified_at) {
            return response()->json([
                'message' => 'Please verify your email first'
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
                'profile' => null,
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
}
