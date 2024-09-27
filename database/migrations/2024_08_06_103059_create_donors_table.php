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
        Schema::create('donors', function (Blueprint $table) {
            $table->id();
            $table->string('name', 40); // Updated length to accommodate longer names
            $table->string('email', 30); // Updated length and added unique constraint
            $table->string('blood_type', 10); // Updated column name and length
            $table->date('date_of_birth'); // Updated column name and removed length
            $table->date('last_donation')->nullable(); // Removed length
            $table->integer('weight')->nullable(); // Added weight field
            $table->boolean('no_disqualifying_conditions')->default(false); // Added boolean field
            $table->string('eligibility_document'); // Added field for file path
            $table->string('status')->default('pending');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donors');
    }
};
