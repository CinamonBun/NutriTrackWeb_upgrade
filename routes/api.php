<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MoodController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\FoodLogController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\InsightController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\MealLogController;

Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
    ]);

    $user = App\Models\User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('API Token')->plainTextToken;

    return response()->json(['user' => $user, 'token' => $token], 201);
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($request->only('email', 'password'))) {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], 200);
    }

    return response()->json(['error' => 'Unauthorized'], 401);
});

Route::get('/user', function (Request $request) {
    /** @var \App\Models\User $user */
    $user = $request->user();
    return $user;
})->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // --- Manajemen Makanan & Resep ---
    // Endpoint untuk list bahan makanan (Master Data)
    Route::apiResource('/ingredients', IngredientController::class);

    // Resource untuk resep (CRUD)
    Route::apiResource('recipes', RecipeController::class);

    // --- Aktivitas Harian (Logging) ---
    // Log makan harian
    Route::apiResource('meal-logs', MealLogController::class);

    // Food log biasanya nested atau dikelola di dalam MealLog,
    // tapi ini jika Anda ingin akses langsung:
    Route::post('/meal-logs/{mealLog}/food-logs', [MealLogController::class, 'addFood']);
    Route::delete('/food-logs/{foodLog}', [FoodLogController::class, 'destroy']);

    // --- Kondisi Psikologis ---
    // Mencatat mood dan stres
    Route::apiResource('moods', MoodController::class);

    // --- Analisis & Output ---
    // Melihat insight yang dihasilkan sistem
    Route::get('/insights', [InsightController::class, 'index']);
    Route::get('/insights/{insight}', [InsightController::class, 'show']);

});
