<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class support extends Controller
{
    public function support(){
        return view("users.support");
    }
}
