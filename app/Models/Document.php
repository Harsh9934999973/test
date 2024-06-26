<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Document extends Model
{
    use HasFactory, SoftDeletes;

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
        'updated_by'
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

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
