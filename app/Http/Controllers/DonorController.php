<?php

namespace App\Http\Controllers;

use App\Models\Donor;
use Illuminate\Http\Request;
use App\Mail\DonorRegistration;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class DonorController extends Controller
{
    public function add_donor(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:30',
            'email' => 'required|email|max:40',
            'type' => 'required|string|max:10',
            'date' => 'required|date',
            'last_donation' => 'nullable|date',
            'weight' => 'required|numeric|min:50',
            'no_disqualifying_conditions' => 'accepted',
            'eligibility_document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // Verify the donor's eligibility
        if (!$this->isEligible($request)) {
            return redirect()->back();
        }

        // Handle the file upload
        $filePath = null;
        if ($request->hasFile('eligibility_document')) {
            $filePath = $request->file('eligibility_document')->store('documents', 'public');
        }

        // Create and save new donor
        $donor = new Donor();
        $donor->name = $request->input('name');
        $donor->email = $request->input('email');
        $donor->blood_type = $request->input('type');
        $donor->date_of_birth = $request->input('date');
        $donor->last_donation = $request->input('last_donation') ?: null;
        $donor->weight = $request->input('weight');
        $donor->no_disqualifying_conditions = $request->input('no_disqualifying_conditions') ? true : false;
        if ($filePath) {
            $donor->eligibility_document = $filePath;
        }
        $donor->status = 'pending';

        $donor->save();

        // Flash success message
        session()->flash('status', 'Donor registered successfully.');
        session()->flash('alert-type', 'success');
        Mail::to($request->input('email'))->send(new DonorRegistration($donor));

        return redirect()->back();
    }

    /**
     * Verify the eligibility of the donor.
     */
    private function isEligible(Request $request): bool
    {
        $currentDate = now();
        $dob = $request->input('date');
        $lastDonation = $request->input('last_donation');
        $weight = $request->input('weight');


        $age = $currentDate->diffInYears($dob);
        if ($age < 18) {
            session()->flash('birthstatus', 'You cannot registered. You must be at least 18 years old to donate.');
            session()->flash('alert-type', 'error');
            return false;
        }

        if ($lastDonation && $currentDate->diffInMonths($lastDonation) < 3) {
            session()->flash('durationstatus', 'You cannot registered.You must wait at least 3 months between donations.');
            session()->flash('alert-type', 'error');
            return false;
        }

        if ($weight < 50) {
            session()->flash('weightstatus', 'Your weight must be at least 50kg.');
            session()->flash('alert-type', 'error');
            return false;
        }


        if (!$request->input('no_disqualifying_conditions')) {
            session()->flash('status', 'You must confirm that you have no disqualifying conditions.');
            session()->flash('alert-type', 'error');
            return false;
        }


        return true;
    }



}
