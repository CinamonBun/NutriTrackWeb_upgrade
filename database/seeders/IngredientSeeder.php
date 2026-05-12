<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ingredients')->insert([
            [
                'name' => 'Rice (White, cooked)',
                'calories_per_100g' => 130,
                'protein' => 2.7,
                'carbs' => 28,
                'fat' => 0.3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Chicken Breast (Grilled)',
                'calories_per_100g' => 165,
                'protein' => 31,
                'carbs' => 0,
                'fat' => 3.6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Egg (Whole)',
                'calories_per_100g' => 155,
                'protein' => 13,
                'carbs' => 1.1,
                'fat' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
