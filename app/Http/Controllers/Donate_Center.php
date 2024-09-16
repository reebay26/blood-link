<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Donate_Center extends Controller
{
    public function donate_center(){
        return view("users.donate_center");
    }
}
