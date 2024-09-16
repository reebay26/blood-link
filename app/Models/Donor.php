<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    use HasFactory;

    // Specify which attributes are mass assignable
    protected $fillable = [
        'name',
        'email',
        'blood_type',  // Updated from 'type' to 'blood_type' for clarity
        'date_of_birth', // Updated from 'date' to 'date_of_birth' for clarity
        'last_donation',
        'weight',
        'no_disqualifying_conditions',
        'eligibility_document',
        'status'

    ];

    // Optional: Cast attributes to specific types
    protected $casts = [
        'no_disqualifying_conditions' => 'boolean', // Cast to boolean
    ];
}
