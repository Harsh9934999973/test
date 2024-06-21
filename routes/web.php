<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', function () {
    return view('welcome');
})->name('login');

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/test', function () {
        return view('welcome');
    });

});