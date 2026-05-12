<?php

namespace App\Http\Controllers;

use App\Models\FoodLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FoodLogController extends Controller
{
    /**
     * Remove the specified food log from storage and update meal log calories.
     */
    public function destroy(Request $request, string $id)
    {
        $foodLog = FoodLog::with('mealLog')->find($id);

        if (!$foodLog) {
            return response()->json(['status' => 'error', 'message' => 'Food log not found'], 404);
        }

        // Verify the food log belongs to a meal log owned by the user
        if ($foodLog->mealLog->user_id !== $request->user()->id) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 403);
        }

        return DB::transaction(function () use ($foodLog) {
            // Calculate calories to subtract based on how we added them
            $caloriesToSubtract = 0;

            if ($foodLog->type === 'ingredient' && $foodLog->ingredient) {
                $caloriesToSubtract = ($foodLog->ingredient->calories_per_100g / 100) * $foodLog->quantity;
            } elseif ($foodLog->type === 'recipe' && $foodLog->recipe) {
                $totalRecipeCalories = 0;
                foreach ($foodLog->recipe->ingredients as $ri) {
                    $ingCalories = ($ri->ingredient->calories_per_100g / 100) * $ri->quantity_gram;
                    $totalRecipeCalories += $ingCalories;
                }
                $caloriesToSubtract = $totalRecipeCalories * $foodLog->quantity;
            } elseif ($foodLog->type === 'manual') {
                $caloriesToSubtract = $foodLog->calories_manual * $foodLog->quantity;
            }

            // Decrement meal log calories
            // Ensure we don't go below 0
            $mealLog = $foodLog->mealLog;
            $newCalories = max(0, $mealLog->total_calories - $caloriesToSubtract);
            $mealLog->update(['total_calories' => $newCalories]);

            $foodLog->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Food log deleted successfully',
                'total_calories' => $newCalories
            ]);
        });
    }
}
