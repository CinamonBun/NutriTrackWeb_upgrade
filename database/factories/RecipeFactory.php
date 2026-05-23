<?php

namespace Database\Factories;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecipeFactory extends Factory
{
    protected $model = Recipe::class;

    protected static int $index = 0;

    public function definition(): array
    {
        $recipes = [
            [
                'name' => 'Nasi Ayam Goreng',
                'desc' => 'Nasi dengan ayam goreng crispy.',
            ],
            [
                'name' => 'Mie Ayam',
                'desc' => 'Mie ayam gurih dengan topping ayam.',
            ],
            [
                'name' => 'Rawon',
                'desc' => 'Sup rawon khas Jawa Timur.',
            ],
        ];

        $recipe = $recipes[self::$index];

        self::$index++;

        return [
            'user_id' => User::factory(),
            'name' => $recipe['name'],
            'is_favorite' => false,
            'desc' => $recipe['desc'],
        ];
    }
}
