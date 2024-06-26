<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\YearTypeController;
use App\Http\Controllers\YearValueController;
use App\Http\Controllers\DocumentController;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;



Route::post('/signup', [AuthController::class, 'createAccount']);

Route::post('/login', [AuthController::class, 'signin']);


Route::get('/storage/{filename}', function ($filename) {
    $path = storage_path('app/public/' . $filename);

    if (!Storage::disk('public')->exists($filename)) {
        abort(404);
    }

    return response()->file($path, [
        'Content-Disposition' => 'inline; filename="' . $filename . '"',
        'Content-Type' => 'application/pdf',
    ]);
})->where('filename', '^.+\.(pdf)$');


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

    Route::resource('year-types', YearTypeController::class);

    Route::get('/year-values/{year_type_id}', [YearValueController::class, 'index']);

    Route::post('/year-values', [YearValueController::class, 'store']);

// Route for fetching a specific YearValue by its ID
Route::get('/year-values/{id}', [YearValueController::class, 'show']);

// Route for updating a specific YearValue by its ID
Route::put('/year-values/{id}', [YearValueController::class, 'update']);

// Route for deleting a specific YearValue by its ID
Route::delete('/year-values/{id}', [YearValueController::class, 'destroy']);

Route::post('/documents', [DocumentController::class, 'store']);

Route::get('/documents', [DocumentController::class, 'index']);



});
