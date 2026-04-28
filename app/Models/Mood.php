<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mood extends Model
{
    protected $fillable = ['user_id', 'mood_level', 'stress_level', 'note'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
}