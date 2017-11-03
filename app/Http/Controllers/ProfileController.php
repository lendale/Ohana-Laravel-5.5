<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function build_profile()
    {
        return view('build-profile');
    }

    public function me()
    {
        return view('me');
    }
}
