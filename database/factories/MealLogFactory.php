<?php

namespace Database\Factories;

use App\Models\MealLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MealLogFactory extends Factory
{
    protected $model = MealLog::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'meal_type' => $this->faker->randomElement([
                'breakfast',
                'lunch',
                'dinner',
                'snack'
            ]),
            'total_calories' => $this->faker->numberBetween(100, 1200),
        ];
    }
}
