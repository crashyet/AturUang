<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\Api\ReportController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/auth/google', [AuthController::class, 'googleLogin']);

// Protected routes (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // Auth profile routes
    Route::get('/user/profile', [AuthController::class, 'profile']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);

    // Accounts routes
    Route::get('/accounts', [AccountController::class, 'index']);
    Route::post('/accounts', [AccountController::class, 'store']);
    Route::put('/accounts/{id}/visibility', [AccountController::class, 'toggleVisibility']);

    // Transactions routes
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);

    // Analysis routes
    Route::get('/analysis', [AnalysisController::class, 'getAnalysis']);

    // Reports routes
    Route::get('/reports', [ReportController::class, 'getReport']);
});
