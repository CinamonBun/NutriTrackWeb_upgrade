<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use App\Models\MealLog;
use App\Models\FoodLog;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Services\RecipeNutritionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MealLogController extends Controller
{
    public function index(Request $request)
    {
        $query = MealLog::with([
            'foodLogs.recipe',
            'foodLogs.ingredient'
        ])->where('user_id', $request->user()->id);

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $mealLogs = $query->orderBy('created_at', 'desc')->get();

        return ApiResponse::success($mealLogs);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'meal_type' => 'nullable|string|max:255',

            'foods' => 'required|array|min:1',
            'foods.*.type' => 'required|in:ingredient,recipe,manual',

            'foods.*.ingredient_id' => 'required_if:foods.*.type,ingredient|exists:ingredients,id',
            'foods.*.recipe_id' => 'required_if:foods.*.type,recipe|exists:recipes,id',

            'foods.*.quantity' => 'required|numeric|min:1',

            'foods.*.name_manual' => 'required_if:foods.*.type,manual|string',
            'foods.*.calories' => 'required_if:foods.*.type,manual|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error(
                $validator->errors(),
                'Validation error',
                422
            );
        }

        return DB::transaction(function () use ($request) {

            // 🔥 AUTO MEAL TYPE
            $mealType = $request->meal_type ?? $this->getMealTypeFromTime();

            if (!in_array($mealType, ['breakfast', 'lunch', 'dinner'])) {
                $mealType = $this->getMealTypeFromTime();
            }

            $mealLog = MealLog::where('user_id', $request->user()->id)
                ->where('meal_type', $mealType)
                ->whereDate('created_at', now()->toDateString())
                ->first();

            if (!$mealLog) {
                $mealLog = MealLog::create([
                    'user_id' => $request->user()->id,
                    'meal_type' => $mealType,
                    'total_calories' => 0,
                ]);
            }

            $totalCalories = 0;

            foreach ($request->foods as $food) {

                $calories = 0;
                $protein = 0;
                $fat = 0;
                $carbohydrate = 0;

                // ingredient
                if ($food['type'] === 'ingredient') {

                    $ingredient = Ingredient::findOrFail($food['ingredient_id']);
                    $factor = $food['quantity'] / 100;

                    $calories = $ingredient->calories_per_100g * $factor;
                    $protein = $ingredient->protein * $factor;
                    $fat = $ingredient->fat * $factor;
                    $carbohydrate = $ingredient->carbs * $factor;
                }

                // recipe
                elseif ($food['type'] === 'recipe') {

                    $recipe = Recipe::with('ingredients.ingredient')
                        ->findOrFail($food['recipe_id']);

                    $nutrition = app(RecipeNutritionService::class)
                        ->calculateFromRecipeIngredients($recipe->ingredients, (float) $food['quantity']);

                    $calories = $nutrition['calories'];
                    $protein = $nutrition['protein'];
                    $fat = $nutrition['fat'];
                    $carbohydrate = $nutrition['carbohydrate'];
                }

                // manual
                else {
                    $calories = $food['calories'] * $food['quantity'];
                }

                $totalCalories += $calories;

                FoodLog::create([
                    'meal_log_id' => $mealLog->id,
                    'type' => $food['type'],

                    'ingredient_id' => $food['type'] === 'ingredient' ? $food['ingredient_id'] : null,
                    'recipe_id' => $food['type'] === 'recipe' ? $food['recipe_id'] : null,
                    'name_manual' => $food['type'] === 'manual' ? $food['name_manual'] : null,

                    'calories' => $calories,
                    'protein' => $protein,
                    'fat' => $fat,
                    'carbohydrate' => $carbohydrate,

                    'quantity' => $food['quantity'],
                ]);
            }

            $mealLog->increment('total_calories', $totalCalories);

            return ApiResponse::success(
                $mealLog->fresh()->load('foodLogs'),
                'Meal log saved successfully',
                201
            );
        });
    }

    public function show(Request $request, string $id)
    {
        $mealLog = MealLog::with(['foodLogs.ingredient', 'foodLogs.recipe'])
            ->where('user_id', $request->user()->id)
            ->find($id);

        if (!$mealLog) {
            return ApiResponse::error(null, 'Meal log not found', 404);
        }

        return ApiResponse::success($mealLog);
    }

    public function update(Request $request, string $id)
    {
        $mealLog = MealLog::where('user_id', $request->user()->id)->find($id);

        if (!$mealLog) {
            return ApiResponse::error(null, 'Meal log not found', 404);
        }

        $validator = Validator::make($request->all(), [
            'meal_type' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation error', 422);
        }

        $mealLog->update([
            'meal_type' => $request->meal_type
        ]);

        return ApiResponse::success($mealLog, 'Meal log updated successfully');
    }

    public function destroy(Request $request, string $id)
    {
        $mealLog = MealLog::where('user_id', $request->user()->id)->find($id);

        if (!$mealLog) {
            return ApiResponse::error(null, 'Meal log not found', 404);
        }

        $mealLog->delete();

        return ApiResponse::success(null, 'Meal log deleted successfully', 204);
    }

    private function getMealTypeFromTime(): string
    {
        $hour = now()->hour;

        return match (true) {
            $hour >= 5 && $hour < 11 => 'breakfast',
            $hour >= 11 && $hour < 16 => 'lunch',
            default => 'dinner',
        };
    }
}
