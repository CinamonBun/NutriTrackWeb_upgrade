<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FoodLog extends Model
{
    protected $fillable = [
        'meal_log_id', 'type', 'ingredient_id', 'recipe_id',
        'name_manual', 'calories_manual', 'quantity'
    ];

    public function mealLog(): BelongsTo { return $this->belongsTo(MealLog::class); }
    public function ingredient(): BelongsTo { return $this->belongsTo(Ingredient::class); }
    public function recipe(): BelongsTo { return $this->belongsTo(Recipe::class); }
}