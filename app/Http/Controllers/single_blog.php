<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class single_blog extends Controller
{
   public function single_blog(){
    return view("users.single_blog");
   }
}
