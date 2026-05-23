<?php

namespace Database\Factories;

use App\Models\FoodLog;
use App\Models\Ingredient;
use App\Models\MealLog;
use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

class FoodLogFactory extends Factory
{
    protected $model = FoodLog::class;

    public function definition(): array
    {
        $type = $this->faker->randomElement([
            'ingredient',
            'recipe',
            'manual'
        ]);

        return [
            'meal_log_id' => MealLog::factory(),
            'type' => $type,

            'ingredient_id' => $type === 'ingredient'
                ? Ingredient::factory()
                : null,

            'recipe_id' => $type === 'recipe'
                ? Recipe::factory()
                : null,

            'name_manual' => $type === 'manual'
                ? $this->faker->words(2, true)
                : null,

            'calories_manual' => $type === 'manual'
                ? $this->faker->numberBetween(50, 700)
                : null,

            'quantity' => $this->faker->randomFloat(2, 1, 500),
        ];
    }
}
