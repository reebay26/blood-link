<?php

namespace App\Http\Controllers;

use App\Models\Donor;
use App\Models\Search;
use Illuminate\Http\Request;

class SearchController extends Controller
{

    public function search_donor(){
        // Initialize results as an empty collection
        $results = collect();
        $message = null;

        return view("users.search_donor", compact('results', 'message'));
    }

    public function search(Request $request){
        // Validate the inputs
        $request->validate([
            'bloodtype' => 'required|string|max:10',
            'time_frame' => 'nullable|string|in:1_week,1_month,3_months',
        ]);

        // Retrieve the input values
        $bloodType = $request->input('bloodtype');
        $timeFrame = $request->input('time_frame', '3_months'); // Default to 3 months if not provided

        // Initialize the results variable
        $results = collect();

        // Query the Donor model
        $query = Donor::query();
        
          // Filter only approved donors
          $query->where('status', 'approved');

        // Apply filters if provided
        if (!empty($bloodType)) {
            $query->where('blood_type', $bloodType);
        }

        // Set default time frame if not provided
        $now = now(); // Get current date and time

        // Apply time frame filter
        switch ($timeFrame) {
            case '1_week':
                $query->where(function ($query) use ($now) {
                    $query->whereDate('last_donation', '<', $now->subWeek())
                          ->orWhereNull('last_donation');
                });
                break;
            case '1_month':
                $query->where(function ($query) use ($now) {
                    $query->whereDate('last_donation', '<', $now->subMonth())
                          ->orWhereNull('last_donation');
                });
                break;
            case '3_months':
                $query->where(function ($query) use ($now) {
                    $query->whereDate('last_donation', '<', $now->subMonths(3))
                          ->orWhereNull('last_donation');
                });
                break;
        }

        // Get the results
        $results = $query->get();


        if ($results->isEmpty()) {
            $message = 'Sorry, no donors found for the specified criteria.';
        } else {
            // Check for donors with no donation and set a message
            $donorsWithNoDonation = $results->whereNull('last_donation');
            if ($donorsWithNoDonation->isNotEmpty()) {
                $message = 'Some donors have not donated yet.';
            } else {
                $message = null;
            }
        }
        // Return the view with results and message
        return view('users.search_donor')->with(compact('results', 'message'));
    }


    }
