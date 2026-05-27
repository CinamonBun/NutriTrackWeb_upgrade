<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityGuideline extends Model
{
    protected $fillable = [
        'icon',
        'content',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
