<?php

namespace App\Mail;

use App\Models\Volunteer;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VolunteerApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $v_details;

    public function __construct(Volunteer $v_details)
    {
        $this->v_details = $v_details;
    }

    public function build()
    {
        return $this->view('emails.volunteer_approved')
                    ->with([
                        'v_details' => $this-> v_details,
                    ]);
    }
}
