<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddYearValueIdToSubCategories extends Migration
{
    public function up()
    {
        Schema::table('sub_categories', function (Blueprint $table) {
            $table->unsignedBigInteger('year_value_id')->after('updated_by');
            $table->foreign('year_value_id')->references('id')->on('year_values')->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::table('sub_categories', function (Blueprint $table) {
            $table->dropForeign(['year_value_id']);
            $table->dropColumn('year_value_id');
        });
    }
}
