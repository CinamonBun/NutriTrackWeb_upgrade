<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Mail\PasswordResetCodeMail;
use App\Mail\SendOtpMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        DB::beginTransaction();

        try {
            $otp = rand(100000, 999999);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),

                'otp_code' => $otp,
                'otp_expires_at' => Carbon::now()->addMinutes(10),
            ]);

            Mail::to($user->email)->send(
                new SendOtpMail($otp)
            );

            DB::commit();

            return ApiResponse::success(
                $user,
                'Registrasi berhasil. Kode OTP telah dikirim.'
            );
        } catch (\Throwable $e) {

            DB::rollBack();

            return ApiResponse::error(
                $e->getMessage(),
                500
            );
        }
    }

    public function resendVerification(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return ApiResponse::error(null, 'User tidak ditemukan', 404);
        }

        if ($user->email_verified_at) {
            return ApiResponse::error(null, 'Email sudah diverifikasi', 400);
        }

        $otp = rand(100000, 999999);

        $user->update([
            'otp_code' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(10),
        ]);

        Mail::to($user->email)->send(
            new SendOtpMail($otp)
        );

        return ApiResponse::success(
            null,
            'Kode OTP berhasil dikirim ulang'
        );
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return ApiResponse::error(null, 'User tidak ditemukan', 404);
        }

        if ($user->email_verified_at) {
            return ApiResponse::error(null, 'Email sudah diverifikasi', 400);
        }

        if ($user->otp_code != $request->otp) {
            return ApiResponse::error(null, 'Kode OTP tidak valid', 400);
        }

        if (
            !$user->otp_expires_at ||
            Carbon::now()->gt($user->otp_expires_at)
        ) {
            return ApiResponse::error(null, 'Kode OTP sudah kadaluarsa', 400);
        }

        $user->update([
            'email_verified_at' => Carbon::now(),
            'otp_code' => null,
            'otp_expires_at' => null,
        ]);

        return ApiResponse::success(
            null,
            'Email berhasil diverifikasi'
        );
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return ApiResponse::error(
                'Email atau password salah',
                401
            );
        }

        $user = Auth::user();

        if (!$user->email_verified_at) {
            return ApiResponse::error(
                'Email Anda belum diverifikasi.',
                403
            );
        }

        $token = $user->createToken('API Token')->plainTextToken;
        $user['token'] = $token;

        return ApiResponse::success(
            $user,
            'Login berhasil'
        );
    }

    public function user(Request $request)
    {
        return ApiResponse::success($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return ApiResponse::success(
            null,
            'Logout berhasil'
        );
    }

    public function getProfile(Request $request)
    {
        $user = $request->user();

        $profile = $user->profile;

        if (!$profile) {
            return ApiResponse::error(
                'Profil tidak ditemukan',
                404
            );
        }

        return ApiResponse::success(
            $profile,
            'Profil berhasil diambil'
        );
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

        return ApiResponse::success(
            $profile,
            'Profil berhasil diperbarui'
        );
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return ApiResponse::error(
                'User tidak ditemukan',
                404
            );
        }

        $otp = rand(100000, 999999);

        $user->update([
            'reset_otp' => $otp,
            'reset_otp_expires_at' => Carbon::now()->addMinutes(10),
        ]);

        Mail::to($user->email)->send(
            new PasswordResetCodeMail(
                (string) $otp,
                $user->name
            )
        );

        return ApiResponse::success(
            null,
            'Kode OTP reset password telah dikirim'
        );
    }

    public function verifyResetOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return ApiResponse::error(
                'User tidak ditemukan',
                404
            );
        }

        if ($user->reset_otp != $request->otp) {
            return ApiResponse::error(
                'Kode OTP tidak valid',
                400
            );
        }

        if (
            !$user->reset_otp_expires_at ||
            Carbon::now()->gt($user->reset_otp_expires_at)
        ) {
            return ApiResponse::error(
                'Kode OTP sudah kadaluarsa',
                400
            );
        }

        return ApiResponse::success(
            null,
            'OTP valid'
        );
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
            return ApiResponse::error(
                'User tidak ditemukan',
                404
            );
        }

        if ($user->reset_otp != $request->otp) {
            return ApiResponse::error(
                'Kode OTP tidak valid',
                400
            );
        }

        if (
            !$user->reset_otp_expires_at ||
            Carbon::now()->gt($user->reset_otp_expires_at)
        ) {
            return ApiResponse::error(
                'Kode OTP sudah kadaluarsa',
                400
            );
        }

        $user->update([
            'password' => Hash::make($request->password),

            'reset_otp' => null,
            'reset_otp_expires_at' => null,
        ]);

        return ApiResponse::success(
            null,
            'Password berhasil direset'
        );
    }
}
