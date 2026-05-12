<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\MealLog;
use App\Models\FoodLog;
use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MealLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $mealLogs = MealLog::with('foodLogs')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $mealLogs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'meal_type' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $mealLog = MealLog::create([
            'user_id' => $request->user()->id,
            'meal_type' => $request->meal_type,
            'total_calories' => 0,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Meal log created successfully',
            'data' => $mealLog
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $mealLog = MealLog::with(['foodLogs.ingredient', 'foodLogs.recipe'])
            ->where('user_id', $request->user()->id)
            ->find($id);

        if (!$mealLog) {
            return response()->json(['status' => 'error', 'message' => 'Meal log not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $mealLog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $mealLog = MealLog::where('user_id', $request->user()->id)->find($id);

        if (!$mealLog) {
            return response()->json(['status' => 'error', 'message' => 'Meal log not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'meal_type' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $mealLog->update([
            'meal_type' => $request->meal_type
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Meal log updated successfully',
            'data' => $mealLog
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $mealLog = MealLog::where('user_id', $request->user()->id)->find($id);

        if (!$mealLog) {
            return response()->json(['status' => 'error', 'message' => 'Meal log not found'], 404);
        }

        $mealLog->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Meal log deleted successfully'
        ], 204);
    }

    /**
     * Add food to a meal log.
     */
    public function addFood(Request $request, string $mealLogId)
    {
        $mealLog = MealLog::where('user_id', $request->user()->id)->find($mealLogId);

        if (!$mealLog) {
            return response()->json(['status' => 'error', 'message' => 'Meal log not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'type' => 'required|in:ingredient,recipe,manual',
            'ingredient_id' => 'required_if:type,ingredient|exists:ingredients,id',
            'recipe_id' => 'required_if:type,recipe|exists:recipes,id',
            'name_manual' => 'required_if:type,manual|string',
            'calories_manual' => 'required_if:type,manual|numeric|min:0',
            'quantity' => 'required|numeric|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        return DB::transaction(function () use ($request, $mealLog) {
            $calories = 0;

            if ($request->type === 'ingredient') {
                $ingredient = Ingredient::find($request->ingredient_id);
                $calories = ($ingredient->calories_per_100g / 100) * $request->quantity;
            } elseif ($request->type === 'recipe') {
                $recipe = Recipe::with('ingredients.ingredient')->find($request->recipe_id);
                $totalRecipeCalories = 0;
                foreach ($recipe->ingredients as $ri) {
                     $ingCalories = ($ri->ingredient->calories_per_100g / 100) * $ri->quantity_gram;
                     $totalRecipeCalories += $ingCalories;
                }
                $calories = $totalRecipeCalories * $request->quantity;
            } elseif ($request->type === 'manual') {
                $calories = $request->calories_manual * $request->quantity;
            }

            $foodLog = FoodLog::create([
                'meal_log_id' => $mealLog->id,
                'type' => $request->type,
                'ingredient_id' => $request->type === 'ingredient' ? $request->ingredient_id : null,
                'recipe_id' => $request->type === 'recipe' ? $request->recipe_id : null,
                'name_manual' => $request->type === 'manual' ? $request->name_manual : null,
                'calories_manual' => $request->type === 'manual' ? $request->calories_manual : null,
                'quantity' => $request->quantity
            ]);

            $mealLog->increment('total_calories', $calories);

            return response()->json([
                'status' => 'success',
                'message' => 'Food added successfully',
                'data' => $foodLog,
                'total_calories' => $mealLog->fresh()->total_calories
            ], 201);
        });
    }
}
