<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ingredient extends Model
{
    protected $fillable = ['name', 'calories_per_100g', 'protein', 'carbs', 'fat'];

    public function recipeIngredients(): HasMany { return $this->hasMany(RecipeIngredient::class); }
    public function foodLogs(): HasMany { return $this->hasMany(FoodLog::class); }
}