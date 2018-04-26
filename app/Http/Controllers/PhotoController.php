<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function album_clan()
    {
        return view('album_clan');
    }

    public function clan_album()
    {
        return view('clan-album');
    }

    public function album_user()
    {
        return view('album_user');
    }

}
