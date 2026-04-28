<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MealLog extends Model
{
    protected $fillable = ['user_id', 'meal_type', 'total_calories'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function foodLogs(): HasMany { return $this->hasMany(FoodLog::class); }
}