<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class about extends Controller
{
    public function about_us(){
        return view("users.about_us");
    }
}
