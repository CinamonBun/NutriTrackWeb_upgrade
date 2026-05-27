<?php

namespace Database\Seeders;

use App\Models\FoodLog;
use Illuminate\Database\Seeder;
use App\Models\MealLog;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MealLogSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            return;
        }

        $recipes = Recipe::all();

        $mealTypes = [
            'breakfast',
            'lunch',
            'dinner',
        ];

        for ($i = 0; $i < 7; $i++) {

            $date = Carbon::now()->subDays($i);

            foreach ($mealTypes as $mealType) {

                $recipe = $recipes->random();

                $calories = rand(250, 700);

                $mealLog = MealLog::create([
                    'user_id' => $user->id,
                    'meal_type' => $mealType,
                    'total_calories' => $calories,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);

                $foodCount = rand(2, 4);

                $usedTypes = [];

                for ($f = 0; $f < $foodCount; $f++) {

                    // hindari spam type yang sama
                    $type = fake()->randomElement(['ingredient', 'recipe']);

                    if (count($usedTypes) >= 2 && in_array($type, $usedTypes)) {
                        continue;
                    }

                    $usedTypes[] = $type;

                    FoodLog::factory()->create([
                        'meal_log_id' => $mealLog->id,
                        'type' => $type,
                    ]);
                }
            }
        }
    }
}
