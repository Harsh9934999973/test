<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'year_value_id',
        'sub_category_id',
        'doc_nos',
        'doc_date',
        'ref_nos',
        'ref_date',
        'title',
        'attachment',
        'new_tag',
        'new_tag_day',
    ];

    // Define relationships if needed
    public function yearValue()
    {
        return $this->belongsTo(YearValue::class, 'year_value_id');
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }
}
