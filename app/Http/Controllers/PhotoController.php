<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function clanalbum()
    {
        return view('clanalbum');
    }

    public function clan_album()
    {
        return view('clan-album');
    }

    public function user_album()
    {
        return view('user_album');
    }
}
