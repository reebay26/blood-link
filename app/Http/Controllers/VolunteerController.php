<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Volunteer;
use Illuminate\Support\Facades\Mail;
use App\Mail\VolunteerApprovedMail;

class VolunteerController extends Controller
{

    public function volunteer_register(Request $request)
    {
      $volunteer=new Volunteer();
      $volunteer->name = $request->input('name');
      $volunteer->email = $request->input('email');
      $volunteer->contact= $request->input('contact');
      $volunteer->role = $request->input('role');
      $volunteer->status = 'pending';
    $volunteer->save();


        session()->flash('status', 'Thank You for registering! we will get back to you soon');
        // Redirect or respond as needed
        return redirect()->back();

    }


}
