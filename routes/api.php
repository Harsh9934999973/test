<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;



Route::post('/signup', [AuthController::class, 'createAccount']);

Route::post('/login', [AuthController::class, 'signin']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/signout', [AuthController::class, 'signout']);

    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/categories', [CategoryController::class, 'index']);

    Route::post('/createcategory', [CategoryController::class, 'store']);

    Route::put('/categories/{category}', [CategoryController::class, 'update']);


});
