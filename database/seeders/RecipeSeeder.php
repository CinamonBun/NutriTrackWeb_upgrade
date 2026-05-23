<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recipe;
use App\Models\Ingredient;
use Illuminate\Support\Facades\DB;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $recipes = [
            [
                'name' => 'Nasi Goreng Ayam',
                'desc' => 'Nasi goreng dengan ayam',
            ],
            [
                'name' => 'Soto Ayam',
                'desc' => 'Soto ayam khas Indonesia',
            ],
            [
                'name' => 'Rendang',
                'desc' => 'Rendang daging sapi',
            ],
        ];

        foreach ($recipes as $recipeData) {
            $recipe = Recipe::create([
                'user_id' => null,
                'name' => $recipeData['name'],
                'desc' => $recipeData['desc'],
                'is_favorite' => false,
            ]);

            if ($recipe->name === 'Nasi Goreng Ayam') {
                $ayam = Ingredient::where('name', 'Ayam')->first();
                $telur = Ingredient::where('name', 'Telur')->first();

                DB::table('recipe_ingredients')->insert([
                    [
                        'recipe_id' => $recipe->id,
                        'ingredient_id' => $ayam->id,
                        'quantity_gram' => 100,
                    ],
                    [
                        'recipe_id' => $recipe->id,
                        'ingredient_id' => $telur->id,
                        'quantity_gram' => 50,
                    ],
                ]);
            }

            if ($recipe->name === 'Soto Ayam') {
                $ayam = Ingredient::where('name', 'Ayam')->first();

                DB::table('recipe_ingredients')->insert([
                    [
                        'recipe_id' => $recipe->id,
                        'ingredient_id' => $ayam->id,
                        'quantity_gram' => 120,
                    ],
                ]);
            }

            if ($recipe->name === 'Rendang') {
                $sapi = Ingredient::where('name', 'Daging Sapi')->first();

                DB::table('recipe_ingredients')->insert([
                    [
                        'recipe_id' => $recipe->id,
                        'ingredient_id' => $sapi->id,
                        'quantity_gram' => 150,
                    ],
                ]);
            }
        }
    }
}
