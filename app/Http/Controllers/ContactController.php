<?php

namespace App\Http\Controllers;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function contact(){
        return view("users.contact");
    }
    public function contact_us(Request $request){
        $contact = new Contact;
        $contact->name = $request->input('name');
        $contact->email = $request->input('email');
        $contact->phone = $request->input('phone');
        $contact->message = $request->input('message');
        $contact->save();
        session()->flash('status', 'Message sent successfully');
        session()->flash('alert-type', 'success');
        return redirect()->back();
    }
}
