<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FoodLog extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'meal_log_id',

        'type',

        'ingredient_id',
        'recipe_id',

        'name_manual',

        'quantity',

        /**
         * snapshot nutrisi
         */
        'calories',
        'protein',
        'fat',
        'carbohydrate',
    ];

    protected $casts = [
        'quantity' => 'float',

        'calories' => 'float',
        'protein' => 'float',
        'fat' => 'float',
        'carbohydrate' => 'float',
    ];

    public function mealLog(): BelongsTo
    {
        return $this->belongsTo(MealLog::class);
    }

    public function ingredient(): BelongsTo
    {
        return $this->belongsTo(Ingredient::class);
    }

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class);
    }
}
