<?php

namespace App\Models;

use App\Services\RecipeNutritionService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recipe extends Model
{
    protected $fillable = ['user_id', 'name', 'image', 'is_favorite', 'desc'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function ingredients(): HasMany { return $this->hasMany(RecipeIngredient::class); }
    public function foodLogs(): HasMany { return $this->hasMany(FoodLog::class); }

    /**
     * Total gizi dari kombinasi semua bahan (default: 1 porsi resep).
     */
    public function nutritionTotals(float $portions = 1): array
    {
        $this->loadMissing('ingredients.ingredient');

        return app(RecipeNutritionService::class)
            ->calculateFromRecipeIngredients($this->ingredients, $portions);
    }
}
