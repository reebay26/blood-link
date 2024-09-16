<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentBooked;
use App\Mail\RecipientAppointmentBooked;

use App\Models\Appointment;
use App\Models\RecipientAppointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // View appointment page
    public function appointment()
    {
        return view("users.appointment");
    }

    // Book donor appointment
    public function book_donor_appointment(Request $request)
    {
        $appointmentLimit = 5;

        // Check the number of existing appointments for the selected date and time
        $existingAppointments = Appointment::where('date', $request->input('date'))
            ->where('time', $request->input('time'))
            ->count();

        if ($existingAppointments >= $appointmentLimit) {
            session()->flash('status', 'This time slot is fully booked. Please choose a different time.');
            session()->flash('alert-type', 'error');
            return redirect()->back();
        }

        // Save the appointment
        $appointment = new Appointment;
        $appointment->name = $request->input('name');
        $appointment->dob = $request->input('dob');
        $appointment->gender = $request->input('gender');
        $appointment->phone = $request->input('phone');
        $appointment->email = $request->input('email');
        $appointment->date = $request->input('date');
        $appointment->time = $request->input('time');
        $appointment->hospital = $request->input('hospital');
        $appointment->donated = $request->input('donated');
        $appointment->medication = $request->input('medication');
        $appointment->medication_details = $request->input('medication_details') ?: null;
        $appointment->conditions = $request->input('conditions');
        $appointment->conditions_details = $request->input('conditions_details') ?: null;
        $appointment->source = $request->input('source');
        $appointment->comments = $request->input('comments') ?: null;
        $appointment->consent = $request->input('consent');
        $appointment->save();
      
       // Send the email
       Mail::to($request->input('email'))->send(new AppointmentBooked($appointment));

        session()->flash('status', 'Appointment booked successfully! confirmation email has been sent to your email address.');
        session()->flash('alert-type', 'success');

        return redirect()->back();
    }

    // Book recipient appointment
    public function book_recipient_appointment(Request $request)
    {
        $appointmentLimit = 5;

        // Check the number of existing appointments for the selected date and time
        $existingAppointments = RecipientAppointment::where('date', $request->input('date'))
            ->where('time', $request->input('time'))
            ->count();

        if ($existingAppointments >= $appointmentLimit) {
            session()->flash('status', 'This time slot is fully booked. Please choose a different time.');
            session()->flash('alert-type', 'error');
            return redirect()->back();
        }

        // Save the recipient appointment
        $r_appointment = new RecipientAppointment;
        $r_appointment->recipient_name = $request->input('recipient_name');
        $r_appointment->recipient_dob = $request->input('recipient_dob');
        $r_appointment->recipient_gender = $request->input('recipient_gender');
        $r_appointment->recipient_phone = $request->input('recipient_phone');
        $r_appointment->recipient_email = $request->input('recipient_email');
        $r_appointment->date = $request->input('date');
        $r_appointment->time = $request->input('time');
        $r_appointment->hospital = $request->input('hospital');
        $r_appointment->recipient_medication = $request->input('recipient_medication');
        $r_appointment->recipient_medication_details = $request->input('recipient_medication_details') ?: null;
        $r_appointment->recipient_conditions = $request->input('recipient_conditions');
        $r_appointment->recipient_conditions_details = $request->input('recipient_conditions_details') ?: null;
        $r_appointment->recipient_source = $request->input('recipient_source');
        $r_appointment->recipient_comments = $request->input('recipient_comments') ?: null;
        $r_appointment->recipient_consent = $request->input('recipient_consent');
        $r_appointment->save();

         
  
          // Send the email
          Mail::to($request->input('recipient_email'))->send(new RecipientAppointmentBooked($r_appointment));
  


        session()->flash('status', 'Appointment booked successfully!,Confirmation email has been send to your email address.');
        session()->flash('alert-type', 'success');

        return redirect()->back();
    }
}
