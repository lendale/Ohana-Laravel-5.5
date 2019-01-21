<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OhanaController extends Controller
{
    public function genealogy()
    {
        return view('genealogy');
    }

    public function events()
    {
        return view('events');
    }
    
    public function createEvent()
    {
        return view('createEvent');
    }

    public function eventsExtended()
    {
        return view('eventsExtended');
    }

    public function eventsImmediate()
    {
        return view('eventsImmediate');
    }

    public function help()
    {
        return view('help');
    }

    public function settings()
    {
        return view('settings');
    }
}
