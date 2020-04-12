<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login','UsuarioController@login');
Route::post('register','UsuarioController@store');
Route::post('newpassword','UsuarioController@newpassword');

Route::group(['middleware' => ['auth:api']], function () {
    Route::apiResource('usuarios', 'UsuarioController');
    Route::get('logout','UsuarioController@logout'); 
});

