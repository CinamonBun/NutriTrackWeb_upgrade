<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\MoodController;
use App\Http\Controllers\FoodLogController;
use App\Http\Controllers\API\IngredientController;
use App\Http\Controllers\API\InsightController;
use App\Http\Controllers\API\RecipeController;
use App\Http\Controllers\API\MealLogController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/email/resend', [AuthController::class, 'resendVerification']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-reset-otp', [AuthController::class, 'verifyResetOtp']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// PROTECTED ROUTES
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/profile', [AuthController::class, 'getProfile']);

    Route::post('/profile', [AuthController::class, 'updateProfile']);
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // --- Manajemen Makanan & Resep ---
    // Endpoint untuk list bahan makanan (Master Data)
    Route::apiResource('ingredients', IngredientController::class);

    // Resource untuk resep (CRUD)
    Route::apiResource('recipes', RecipeController::class);

    // --- Aktivitas Harian (Logging) ---
    // Log makan harian
    Route::apiResource('meal-logs', MealLogController::class);

    // --- Kondisi Psikologis ---
    // Mencatat mood dan stres
    Route::apiResource('moods', MoodController::class);

    // --- Analisis & Output ---
    // Melihat insight yang dihasilkan sistem
    Route::get('/insights', [InsightController::class, 'index']);
    Route::get('/insights/{insight}', [InsightController::class, 'show']);
});
