<?php

use App\Http\Controllers\blog;
use App\Http\Controllers\more;
use App\Http\Controllers\about;
use App\Http\Controllers\urgent;
use App\Http\Controllers\service;
use App\Http\Controllers\support;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\appointment;
use App\Http\Controllers\single_blog;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\search_donor;
use App\Http\Controllers\Donate_Center;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Donate_controller;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\updateDonorStatus;

// use App\Http\Controllers\AuthController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('auth.register');
});
Route::get('/login', function () {
    return view('auth.login'); // Ensure login view is correctly set
})->name('login');

Route::get('/index', function () {
    return view('users.index');
 });

 Route::get('/donor_reg', function () {
    return view('users.donor_registration');
 });






Route::get('/donate', [Donate_controller::class, 'donate']);
Route::get('/donate_center', [Donate_Center::class, 'donate_center']);
Route::get('/about_us', [about::class, 'about_us']);
Route::get('/appointment', [AppointmentController::class, 'appointment']);
Route::get('/services', [service::class, 'services']);
Route::get('/blog', [blog::class, 'blog']);
Route::get('/single_blog', [single_blog::class, 'single_blog']);
Route::get('/urgent', [urgent::class, 'urgent']);
Route::get('/contact', [ContactController::class, 'contact']);
Route::get('/more', [more::class, 'more']);
Route::get('/support', [support::class, 'support']);
Route::get('/admin_dashboard', [AdminController::class, 'admin_dashboard']);
Route::get('/recentreg', [AdminController::class, 'recentreg']);
Route::get('/showDonorRegistrations', [AdminController::class, 'showDonorRegistrations']);
Route::post('/add_donor',[DonorController::class,'add_donor']);
Route::post('/add_receipt',[ReceiptController::class,'add_receipt']);
Route::post('/contact_us',[ContactController::class,'contact_us']);
Route::post('/search',[SearchController::class,'search']);
Route::post('/book_recipient_appointment',[AppointmentController::class,'book_recipient_appointment']);
Route::post('/book_donor_appointment',[AppointmentController::class,'book_donor_appointment']);
Route::get('/search_donor',[SearchController::class,'search_donor']);
Route::get('/donor_data',[AdminController::class,'donor_data']);
Route::get('/recipient_data',[AdminController::class,'recipient_data']);
Route::get('/donor_appointments',[AdminController::class,'donor_appointments']);
Route::get('/recipient_appointments',[AdminController::class,'recipient_appointments']);
Route::post('/volunteer_register',[VolunteerController::class,'volunteer_register']);
Route::get('/volunteer_details',[AdminController::class,'volunteer_details']);
Route::patch('admin/donor/{id}/status', [AdminController::class, 'updateDonorStatus'])->name('admin.updateDonorStatus');
Route::patch('admin/volunteer/{id}/status', [AdminController::class, 'updateVolunteerStatus'])->name('admin.updateVolunteerStatus');
// In web.php







Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        if (Auth::check() && Auth::user()->usertype == 1) {
            return view('admin.admin_dashboard');
        }
        elseif (Auth::check() && Auth::user()->usertype == 0) {
            return view('users.index');
        }

        else {
            return redirect('/login');

            }
    })->name('dashboard');
});

