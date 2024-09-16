<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Donate_controller extends Controller
{
    public function donate (){
        return view('users.donate');
     }
}
