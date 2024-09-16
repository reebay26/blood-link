<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecipientAppointmentBooked extends Mailable
{
    use Queueable, SerializesModels;

    public $r_appointment;

    /**
     * Create a new message instance.
     *
     * @param  $r_appointment
     * @return void
     */
    public function __construct($r_appointment)
    {
        $this->r_appointment = $r_appointment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.recipient_appointment_booked')
                    ->with([
                        'r_appointment' => $this->r_appointment,
                    ]);
    }
}
