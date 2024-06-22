<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;



Route::post('/signup', [AuthController::class, 'createAccount']);

Route::post('/login', [AuthController::class, 'signin']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/signout', [AuthController::class, 'signout']);

    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/categories', [CategoryController::class, 'index']);

    Route::post('/createcategory', [CategoryController::class, 'store']);

    Route::put('/categories/{category}', [CategoryController::class, 'update']);

    Route::prefix('sub-categories')->group(function () {
        Route::get('/', [SubCategoryController::class, 'index']);
        Route::post('/', [SubCategoryController::class, 'store']);
        Route::get('/{id}', [SubCategoryController::class, 'show']);
        Route::put('/{id}', [SubCategoryController::class, 'update']);
        Route::delete('/{id}', [SubCategoryController::class, 'destroy']);
    });


});
