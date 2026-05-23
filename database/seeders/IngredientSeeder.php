<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ingredient;

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        Ingredient::insert([
            [
                'name' => 'Ayam',
                'calories_per_100g' => 239,
                'protein' => 27,
                'carbs' => 0,
                'fat' => 14,

                'gout_level' => 'medium',
                'verified_by_expert' => true,
                'source' => 'Kemenkes RI',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Telur',
                'calories_per_100g' => 155,
                'protein' => 13,
                'carbs' => 1.1,
                'fat' => 11,

                'gout_level' => 'low',
                'verified_by_expert' => true,
                'source' => 'Kemenkes RI',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Daging Sapi',
                'calories_per_100g' => 250,
                'protein' => 26,
                'carbs' => 0,
                'fat' => 15,

                'gout_level' => 'high',
                'verified_by_expert' => true,
                'source' => 'Kemenkes RI',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bayam',
                'calories_per_100g' => 23,
                'protein' => 2.9,
                'carbs' => 3.6,
                'fat' => 0.4,

                'gout_level' => 'medium',
                'verified_by_expert' => true,
                'source' => 'USDA FoodData Central',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sarden',
                'calories_per_100g' => 208,
                'protein' => 25,
                'carbs' => 0,
                'fat' => 11,

                'gout_level' => 'high',
                'verified_by_expert' => true,
                'source' => 'Kemenkes RI',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tahu',
                'calories_per_100g' => 76,
                'protein' => 8,
                'carbs' => 1.9,
                'fat' => 4.8,

                'gout_level' => 'low',
                'verified_by_expert' => true,
                'source' => 'USDA FoodData Central',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tempe',
                'calories_per_100g' => 192,
                'protein' => 20,
                'carbs' => 7.6,
                'fat' => 11,

                'gout_level' => 'low',
                'verified_by_expert' => true,
                'source' => 'Kemenkes RI',

                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
