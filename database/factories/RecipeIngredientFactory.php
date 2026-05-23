<?php

namespace Database\Factories;

use App\Models\RecipeIngredient;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecipeIngredientFactory extends Factory
{
    protected $model = RecipeIngredient::class;

    protected static int $index = 0;

    public function definition(): array
    {
        $recipeIngredients = [
            // Nasi Ayam Goreng
            [
                'recipe_id' => 1,
                'ingredient_id' => 1, // Nasi
                'quantity_gram' => 200,
            ],
            [
                'recipe_id' => 1,
                'ingredient_id' => 2, // Ayam Goreng
                'quantity_gram' => 120,
            ],

            // Mie Ayam
            [
                'recipe_id' => 2,
                'ingredient_id' => 3, // Mie
                'quantity_gram' => 180,
            ],
            [
                'recipe_id' => 2,
                'ingredient_id' => 4, // Ayam Suwir
                'quantity_gram' => 100,
            ],

            // Rawon
            [
                'recipe_id' => 3,
                'ingredient_id' => 5, // Daging Sapi
                'quantity_gram' => 150,
            ],
            [
                'recipe_id' => 3,
                'ingredient_id' => 6, // Kuah Rawon
                'quantity_gram' => 250,
            ],
        ];

        $data = $recipeIngredients[self::$index];

        self::$index++;

        return $data;
    }
}
