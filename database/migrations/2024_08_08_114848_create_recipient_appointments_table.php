<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
            Schema::create('recipient_appointments', function (Blueprint $table) {
                $table->id();
                $table->string("recipient_name",30);
                $table->date("recipient_dob",30);
                $table->string("recipient_gender",30);
                $table->string("recipient_phone",40);
                $table->string("recipient_email",50);
                $table->date("date",25);
                $table->string("time",10);
                $table->string("hospital",40);
                $table->string("recipient_medication",20);
                $table->Text("recipient_medication_details",200)->nullable();
                $table->string("recipient_conditions",40);
                $table->Text("recipient_conditions_details",200)->nullable();
                $table->string("recipient_source",40);
                $table->Text("recipient_comments",200)->nullable();
                $table->string("recipient_consent",20);
                $table->timestamps();
    
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipient_appointments');
    }
};
