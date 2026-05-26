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

use App\Http\Controllers\CommunityPostController;
use App\Http\Controllers\CommunityInteractionController;
use App\Http\Controllers\Admin\CommunityModerationController;

Route::get('/community', [CommunityPostController::class, 'index'])->name('community.index');
Route::post('/community/posts', [CommunityPostController::class, 'store'])->middleware('auth')->name('community.posts.store');
Route::post('/community/posts/{post}/like', [CommunityInteractionController::class, 'toggleLike'])->middleware('auth')->name('community.posts.like');
Route::post('/community/posts/{post}/save', [CommunityInteractionController::class, 'toggleSave'])->middleware('auth')->name('community.posts.save');
Route::post('/community/posts/{post}/comment', [CommunityInteractionController::class, 'storeComment'])->middleware('auth')->name('community.posts.comment');
Route::post('/community/report', [CommunityInteractionController::class, 'storeReport'])->middleware('auth')->name('community.report');


use App\Http\Controllers\DashboardController;

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
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

    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');

    Route::get('/admin/community', [CommunityModerationController::class, 'index'])->name('admin.community.index');
    Route::patch('/admin/community/posts/{post}', [CommunityModerationController::class, 'updatePost'])->name('admin.community.posts.update');
    Route::delete('/admin/community/posts/{post}', [CommunityModerationController::class, 'destroyPost'])->name('admin.community.posts.destroy');
    Route::patch('/admin/community/comments/{comment}', [CommunityModerationController::class, 'updateComment'])->name('admin.community.comments.update');
    Route::delete('/admin/community/comments/{comment}', [CommunityModerationController::class, 'destroyComment'])->name('admin.community.comments.destroy');
    Route::patch('/admin/community/reports/{report}', [CommunityModerationController::class, 'resolveReport'])->name('admin.community.reports.resolve');
    Route::post('/admin/community/guidelines', [CommunityModerationController::class, 'storeGuideline'])->name('admin.community.guidelines.store');
    Route::patch('/admin/community/guidelines/{guideline}', [CommunityModerationController::class, 'updateGuideline'])->name('admin.community.guidelines.update');
    Route::delete('/admin/community/guidelines/{guideline}', [CommunityModerationController::class, 'destroyGuideline'])->name('admin.community.guidelines.destroy');

});

require __DIR__ . '/auth.php';
