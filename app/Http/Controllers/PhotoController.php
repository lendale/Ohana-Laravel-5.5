<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function album_clan()
    {
        return view('album_clan');
    }

    public function album_user()
    {
        return view('album_user');
    }
    
    public function album_extended()
    {
        return view('album_extended');
    }

    public function album_immediate()
    {
        return view('album_immediate');
    }
}
