<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Insight extends Model
{
    protected $fillable = ['user_id', 'type', 'description'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
}