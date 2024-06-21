<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('year_values', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('year_type');
            $table->foreign('year_type')->references('id')->on('year_types');
            $table->string('value'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('year_values');
    }
};
