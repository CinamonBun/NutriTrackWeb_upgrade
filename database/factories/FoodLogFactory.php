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
        $type = $this->faker->randomElement(['ingredient', 'recipe']);

        return [
            'meal_log_id' => null,
            'type' => $type,

            'ingredient_id' => $type === 'ingredient'
                ? Ingredient::inRandomOrder()->first()?->id
                : null,

            'recipe_id' => $type === 'recipe'
                ? Recipe::inRandomOrder()->first()?->id
                : null,

            'name_manual' => null,

            'calories' => $this->faker->numberBetween(50, 700),
            'protein' => $this->faker->randomFloat(1, 1, 30),
            'fat' => $this->faker->randomFloat(1, 1, 20),
            'carbohydrate' => $this->faker->randomFloat(1, 5, 100),

            'quantity' => $this->faker->randomFloat(2, 1, 3),
        ];
    }
}
