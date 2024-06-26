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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('year_value_id');
            $table->unsignedBigInteger('sub_category_id');
            $table->string('doc_nos');
            $table->date('doc_date');
            $table->string('ref_nos')->nullable();
            $table->date('ref_date')->nullable();
            $table->string('title');
            $table->string('attachment');
            $table->enum('new_tag', ['Y', 'N']);
            $table->integer('new_tag_day')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable(); // New column for updated_by
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraints
            $table->foreign('year_value_id')->references('id')->on('year_values')->onDelete('cascade');
            $table->foreign('sub_category_id')->references('id')->on('sub_categories')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null'); // Assuming 'users' table for updated_by
        });
    }

    public function down()
    {
        Schema::dropIfExists('documents');
    }
};
