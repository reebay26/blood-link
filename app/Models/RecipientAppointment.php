<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipientAppointment extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'dob', 'gender','phone' , 'email' , 'date' , 'time' ,'hospital', 'medication' , 'medication_details' , 'conditions' , 'conditions_details' , 'source' ,'comments'  , 'consent' ];
}
