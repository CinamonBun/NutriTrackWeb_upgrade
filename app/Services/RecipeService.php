<?php

namespace App\Services;

use App\Models\Recipe;
use Illuminate\Support\Facades\DB;

class RecipeService
{
    /**
     * @param array{name:string,desc?:string|null,is_favorite?:bool,image?:string|null,user_id:int} $recipeData
     * @param array<int, array{ingredient_id:int,quantity_gram:float|int|string}> $ingredients
     */
    public function createWithIngredients(array $recipeData, array $ingredients): Recipe
    {
        return DB::transaction(function () use ($recipeData, $ingredients) {
            $recipe = Recipe::create($recipeData);

            $this->syncIngredients($recipe, $ingredients);

            return $recipe->load('ingredients.ingredient');
        });
    }

    /**
     * @param array{name:string,desc?:string|null,is_favorite?:bool,image?:string|null} $recipeData
     * @param array<int, array{ingredient_id:int,quantity_gram:float|int|string}> $ingredients
     */
    public function updateWithIngredients(Recipe $recipe, array $recipeData, array $ingredients): Recipe
    {
        return DB::transaction(function () use ($recipe, $recipeData, $ingredients) {
            $recipe->update($recipeData);

            // Replace all ingredients to keep API/UI simple.
            $recipe->ingredients()->delete();
            $this->syncIngredients($recipe, $ingredients);

            return $recipe->load('ingredients.ingredient');
        });
    }

    /**
     * @param array<int, array{ingredient_id:int,quantity_gram:float|int|string}> $ingredients
     */
    private function syncIngredients(Recipe $recipe, array $ingredients): void
    {
        foreach ($ingredients as $item) {
            $recipe->ingredients()->create([
                'ingredient_id' => $item['ingredient_id'],
                'quantity_gram' => $item['quantity_gram'],
            ]);
        }
    }
}

