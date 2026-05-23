<?php

namespace Database\Factories;

use App\Models\Ingredient;
use Illuminate\Database\Eloquent\Factories\Factory;

class IngredientFactory extends Factory
{
    protected $model = Ingredient::class;

    protected static int $index = 0;

    public function definition(): array
    {
        $ingredients = [
            [
                'name' => 'Nasi',
                'calories_per_100g' => 175,
                'protein' => 3.2,
                'carbs' => 40,
                'fat' => 0.3,
            ],
            [
                'name' => 'Ayam Goreng',
                'calories_per_100g' => 260,
                'protein' => 27,
                'carbs' => 6,
                'fat' => 14,
            ],
            [
                'name' => 'Mie',
                'calories_per_100g' => 180,
                'protein' => 6,
                'carbs' => 35,
                'fat' => 2,
            ],
            [
                'name' => 'Ayam Suwir',
                'calories_per_100g' => 220,
                'protein' => 25,
                'carbs' => 2,
                'fat' => 12,
            ],
            [
                'name' => 'Daging Sapi',
                'calories_per_100g' => 250,
                'protein' => 26,
                'carbs' => 0,
                'fat' => 15,
            ],
            [
                'name' => 'Kuah Rawon',
                'calories_per_100g' => 80,
                'protein' => 2,
                'carbs' => 5,
                'fat' => 6,
            ],
        ];

        $ingredient = $ingredients[self::$index];

        self::$index++;

        return [
            'name' => $ingredient['name'],
            'image' => null,
            'calories_per_100g' => $ingredient['calories_per_100g'],
            'protein' => $ingredient['protein'],
            'carbs' => $ingredient['carbs'],
            'fat' => $ingredient['fat'],
        ];
    }
}
