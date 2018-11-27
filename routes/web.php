<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/build-profile', 'ProfileController@build_profile');

Route::get('/me', 'ProfileController@me');

Route::get('/album_clan', 'PhotoController@album_clan');

Route::get('/clan-album', 'PhotoController@clan_album');

Route::get('/album_user', 'PhotoController@album_user');

Route::get('/events', 'OhanaController@events');

Route::get('/genealogy','OhanaController@genealogy');

Route::get('/sample','OhanaController@sample');

// Route::get('/help', 'OhanaController@help');

// Route::get('/settings', 'OhanaController@settings');

Route::get('/timeline', 'OhanaController@timeline');