<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class more extends Controller
{
    public function more(){
        return view("users.more");
    }
}
