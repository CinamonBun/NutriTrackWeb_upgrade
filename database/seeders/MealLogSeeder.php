<?php

namespace Database\Seeders;

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

                DB::table('food_logs')->insert([
                    'meal_log_id' => $mealLog->id,
                    'type' => 'recipe',
                    'recipe_id' => $recipe->id,
                    'ingredient_id' => null,
                    'name_manual' => null,
                    'calories_manual' => null,
                    'quantity' => rand(1, 3),
                ]);
            }
        }
    }
}
