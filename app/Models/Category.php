<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'hn_name', 'created_by', 'updated_by', 'folder_name'
    ];

    /**
     * Get the user that created the category.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user that updated the category.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
