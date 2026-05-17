<?php

use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminVerificationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index');
});

Route::get('/about', function () {
    return Inertia::render('about');
});

Route::get('/features', function () {
    return Inertia::render('features');
});

Route::get('/riviews', function () {
    return Inertia::render('riviews');
});



use App\Http\Controllers\DashboardController;

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', UserController::class);
    Route::post('users/{user}/send-verification', [AdminVerificationController::class, 'send'])->name('users.send-verification');
    Route::post('users/{user}/verify', [AdminVerificationController::class, 'verify'])->name('users.verify');
    Route::post('users/{user}/send-password-reset', [UserController::class, 'sendPasswordReset'])->name('users.send-password-reset');
    Route::post('users/{user}/send-password-reset-code', [UserController::class, 'sendPasswordResetCode'])->name('users.send-password-reset-code');
    Route::post('users/{user}/reset-password-with-code', [UserController::class, 'resetPasswordWithCode'])->name('users.reset-password-with-code');
    Route::post('users/{user}/send-action-verification-code', [UserController::class, 'sendActionVerificationCode'])->name('users.send-action-verification-code');
    Route::post('users/{user}/verify-action-code', [UserController::class, 'verifyActionCode'])->name('users.verify-action-code');

    // Admin Ingredient Management
    Route::resource('ingredients', \App\Http\Controllers\AdminIngredientController::class)->names([
        'index' => 'admin.ingredients.index',
        'create' => 'admin.ingredients.create',
        'store' => 'admin.ingredients.store',
        'show' => 'admin.ingredients.show',
        'edit' => 'admin.ingredients.edit',
        'update' => 'admin.ingredients.update',
        'destroy' => 'admin.ingredients.destroy',
    ]);
    Route::get('ingredients-export', [\App\Http\Controllers\AdminIngredientController::class, 'export'])->name('admin.ingredients.export');
    Route::post('ingredients-import', [\App\Http\Controllers\AdminIngredientController::class, 'import'])->name('admin.ingredients.import');

});

require __DIR__ . '/auth.php';
