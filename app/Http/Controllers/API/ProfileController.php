<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getProfile(Request $request)
    {
        $user = $request->user();

        $profile = $user->profile;

        if (!$profile) {
            return ApiResponse::error(
                null,
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

            // anthropometry
            'height' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',

            'waist_circumference' =>
            'nullable|numeric|min:0',

            'hip_circumference' =>
            'nullable|numeric|min:0',

            // demographics
            'gender' => 'required|in:L,P',
            'age' => 'required|integer|min:0',

            // activity
            'activity_level' =>
            'nullable|in:sedentary,light,moderate,active,very_active',

            // goal
            'goal' =>
            'nullable|in:cutting,maintain,bulking',
        ]);

        $user = $request->user();

        $activityLevel =
            $request->activity_level ?? 'moderate';

        $goal =
            $request->goal ?? 'maintain';

        // save/update profile
        $profile = $user->profile()->updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'height' => $request->height,
                'weight' => $request->weight,

                'waist_circumference' =>
                $request->waist_circumference,

                'hip_circumference' =>
                $request->hip_circumference,

                'gender' => $request->gender,
                'age' => $request->age,

                'activity_level' => $activityLevel,
                'goal' => $goal,
            ]
        );

        /**
         * Calculated values
         */
        $targetCalories =
            $profile->calculateTargetCalories($goal);

        /**
         * Macro distribution
         *
         * Protein = 25%
         * Fat     = 25%
         * Carbs   = 50%
         */

        $proteinTarget =
            round(($targetCalories * 0.25) / 4, 2);

        $fatTarget =
            round(($targetCalories * 0.25) / 9, 2);

        $carbsTarget =
            round(($targetCalories * 0.50) / 4, 2);

        // update nutrition targets
        $profile->update([
            'target_calories' => $targetCalories,

            'protein_target' => $proteinTarget,
            'fat_target' => $fatTarget,
            'carbs_target' => $carbsTarget,
        ]);

        return ApiResponse::success(
            $profile->fresh(),
            'Profile updated successfully'
        );
    }

    public function edit(Request $request)
    {
        return \Inertia\Inertia::render('Admin/Settings', [
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(\App\Http\Requests\ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        if ($request->header('X-Inertia')) {
            return back()->with('success', 'Profile updated successfully.');
        }

        return ApiResponse::success(
            $request->user(),
            'Profile updated successfully'
        );
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = $request->user();

        if ($user->avatar) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->update(['avatar' => $path]);

        if ($request->header('X-Inertia')) {
            return back()->with('success', 'Avatar updated successfully.');
        }

        return ApiResponse::success(
            $user->fresh(),
            'Avatar updated successfully'
        );
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        \Illuminate\Support\Facades\Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->header('X-Inertia')) {
            return redirect('/');
        }

        return ApiResponse::success(null, 'User deleted successfully');
    }
}
