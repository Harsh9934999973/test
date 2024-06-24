<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YearValue extends Model
{
    use HasFactory;

    protected $fillable = ['year_type_id', 'value'];

    public function yearType()
    {
        return $this->belongsTo(YearType::class);
    }
}
