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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string("name", 30);
            $table->date("dob");
            $table->string("gender", 30);
            $table->string("phone", 40);
            $table->string("email", 50);
            $table->date("date");
            $table->string("time", 20);
            $table->string("hospital", 40);
            $table->string("donated", 40);
            $table->string("medication", 20);
            $table->text("medication_details")->nullable();
            $table->string("conditions", 40);
            $table->text("conditions_details")->nullable();
            $table->string("source", 40);
            $table->text("comments")->nullable();
            $table->string("consent", 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
