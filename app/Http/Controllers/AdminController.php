<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Donor;
use App\Models\Receipt;
use App\Models\Volunteer;
use App\Models\Appointment;
use function Ramsey\Uuid\v1;
use Illuminate\Http\Request;
use App\Mail\VolunteerRejectMail;
use Illuminate\Support\Collection;

use App\Mail\VolunteerApprovedMail;
use App\Http\Controllers\Controller;
use App\Models\RecipientAppointment;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function admin_dashboard(){
        return view('admin.admin_dashboard');
    }





    public function recentreg(Request $request)
    {
        $donors = Donor::latest()->limit(5)->get();
        $receipts = Receipt::latest()->limit(5)->get();

        $recentRegistrations = $this->formatRecentRegistrations($donors, $receipts);

        // Convert array to Collection
        $recentRegistrations = collect($recentRegistrations);


        // another data retrivation

             // Calculate today's donors and recipients
    $currentDayDonors = Donor::whereDate('created_at', now()->toDateString())->count();
    $currentDayRecipients = Receipt::whereDate('created_at', now()->toDateString())->count();

    // Calculate yesterday's donors and recipients
    $previousDayDonors = Donor::whereDate('created_at', now()->subDay()->toDateString())->count();
    $previousDayRecipients = Receipt::whereDate('created_at', now()->subDay()->toDateString())->count();

    // Calculate the change percentages
    $donorChange = $this->calculateChange($currentDayDonors, $previousDayDonors);
    $recipientChange = $this->calculateChange($currentDayRecipients, $previousDayRecipients);

    $donorChangeYesterday = $this->calculateChange($previousDayDonors, Donor::whereDate('created_at', now()->subDays(2)->toDateString())->count());
    $recipientChangeYesterday = $this->calculateChange($previousDayRecipients, Receipt::whereDate('created_at', now()->subDays(2)->toDateString())->count());


    $volunteer_reg = Volunteer::latest()->limit(10)->get();



        return view('admin.recentreg', compact('recentRegistrations',   'currentDayDonors', 'currentDayRecipients',
        'previousDayDonors', 'previousDayRecipients',
        'donorChange', 'recipientChange',
        'donorChangeYesterday', 'recipientChangeYesterday','volunteer_reg'));
    }

    protected function formatRecentRegistrations($donors, $recipients)
    {
        $registrations = [];

        foreach ($donors as $donor) {
            $registrations[] = [
                'message' => "{$donor->name} is registered as a donor",
                'created_at' => $donor->created_at->format('d M Y H:i:s')
            ];
        }

        foreach ($recipients as $recipient) {
            $registrations[] = [
                'message' => "{$recipient->name} is registered as a recipient",
                'created_at' => $recipient->created_at->format('d M Y H:i:s')
            ];
        }

        // Sort registrations by date
        usort($registrations, function ($a, $b) {
            return strtotime($b['created_at']) - strtotime($a['created_at']);
        });

        return $registrations; // This is an array
    }

    // priavte function
    private function calculateChange($current, $previous)
{
    if ($previous == 0) {
        return $current > 0 ? 100 : 0;
    }

    return (($current - $previous) / $previous) * 100;
}


// donor data
   public function donor_data(){
    $donordata=Donor::latest()->limit(10)->get();
 // Generate URLs for the eligibility documents
 foreach ($donordata as $donor) {
    if ($donor->eligibility_document) {
        $donor->eligibility_document_url = Storage::url($donor->eligibility_document);
    }
}
    $donorappointment=Appointment::latest()->limit(10)->get();
    return view('admin.donor_data',compact('donordata','donorappointment'));
   }

   public function updateDonorStatus(Request $request, $id)
{
    $donor = Donor::find($id);
    if ($donor) {
        $donor->status = $request->input('status');
        $donor->save();

        return redirect()->back()->with('success', 'Donor status updated successfully');
    }

    return redirect()->back()->with('error', 'Donor not found');
}


//    recipient data
   public function recipient_data(){
    $receiptdata=Receipt::latest()->limit(10)->get();
    $recipientappointment=RecipientAppointment::latest()->limit(10)->get();
    return view('admin.recipient_data',compact('receiptdata','recipientappointment'));
   }

   public function donor_appointments(){
    $appointmentdetails=Appointment::latest()->limit(10)->get();
    return view('admin.donor_appointments',compact('appointmentdetails'));
   }
   public function recipient_appointments(){
    $r_appointmentdetails=RecipientAppointment::latest()->limit(10)->get();
    return view('admin.recipient_appointments',compact('r_appointmentdetails'));
   }
 public function volunteer_details(){
    $volunteer_details = Volunteer::latest()->limit(10)->get();
    return view('admin.volunteer_details',compact('volunteer_details'));
 }

 public function updateVolunteerStatus(Request $request, $id)
 {
    $v_details = Volunteer::find($id);
     if ($v_details) {
 $newStatus=$request->input('status');
 $v_details->status=$newStatus;
 $v_details->save();

 if($newStatus === 'approved'){
    Mail::to( $v_details->email)->send(new VolunteerApprovedMail( $v_details));
 }
 elseif($newStatus === 'rejected'){
    Mail::to( $v_details->email)->send(new VolunteerRejectMail( $v_details));
 }
 else{
    return redirect()->back()->with('error', 'Volunteer not find');
 }
 session()->flash('status','Confirmation Email sent successfully');
         return redirect()->back();
     }


 }

}
