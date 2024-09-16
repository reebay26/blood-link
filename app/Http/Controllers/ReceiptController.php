<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use Illuminate\Http\Request;

class ReceiptController extends Controller
{
    public function add_receipt(Request $request)
    {
      $receipt = new receipt;
      $receipt->name = $request->input('name');
      $receipt->email = $request->input('email');
      $receipt->rtype = $request->input('rtype');
      $receipt->date = $request->input('date');
      $receipt->save();
      session()->flash('status', 'Recipient registered successfully');
      session()->flash('alert-type', 'success');

      return redirect()->back();
    }
}
