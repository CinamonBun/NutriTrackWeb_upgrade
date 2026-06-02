<?php

namespace App\Services;

class RecipeNutritionService
{
    private const GOUT_RANK = [
        'low' => 1,
        'medium' => 2,
        'high' => 3,
    ];

    /**
     * Hitung total gizi dari kombinasi bahan resep (per 1 porsi resep).
     *
     * @param iterable<int, object{quantity_gram: float|int|string, ingredient?: object|null}> $recipeIngredients
     */
    public function calculateFromRecipeIngredients(iterable $recipeIngredients, float $portions = 1): array
    {
        $calories = 0.0;
        $protein = 0.0;
        $fat = 0.0;
        $carbohydrate = 0.0;
        $goutLevels = [];

        foreach ($recipeIngredients as $row) {
            $ingredient = $row->ingredient ?? null;
            if (!$ingredient) {
                continue;
            }

            $factor = (float) $row->quantity_gram / 100;

            $calories += (float) $ingredient->calories_per_100g * $factor;
            $protein += (float) ($ingredient->protein ?? 0) * $factor;
            $fat += (float) ($ingredient->fat ?? 0) * $factor;
            $carbohydrate += (float) ($ingredient->carbs ?? 0) * $factor;

            if (!empty($ingredient->gout_level)) {
                $goutLevels[] = $ingredient->gout_level;
            }
        }

        return [
            'calories' => round($calories * $portions, 2),
            'protein' => round($protein * $portions, 2),
            'fat' => round($fat * $portions, 2),
            'carbohydrate' => round($carbohydrate * $portions, 2),
            'gout_level' => $this->resolveGoutLevel($goutLevels),
        ];
    }

    /**
     * @param array<int, string> $levels
     */
    public function resolveGoutLevel(array $levels): string
    {
        $highest = 'low';

        foreach ($levels as $level) {
            if (($this::GOUT_RANK[$level] ?? 0) > ($this::GOUT_RANK[$highest] ?? 0)) {
                $highest = $level;
            }
        }

        return $highest;
    }
}
