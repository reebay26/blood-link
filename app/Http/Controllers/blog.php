<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class blog extends Controller
{
    public function blog(){
        return view("users.blog");
    }
}
