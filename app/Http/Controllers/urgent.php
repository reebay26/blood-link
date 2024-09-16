<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class urgent extends Controller
{
    public function urgent(){
        return view("users.urgent");
    }
}
