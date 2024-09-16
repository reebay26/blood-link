<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointment extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'dob', 'gender','phone' , 'email' , 'date' , 'time' ,'hospital', 'donated'  , 'medication' , 'medication_details' , 'conditions' , 'conditions_details' , 'source' ,'comments'  , 'consent' ];
}
