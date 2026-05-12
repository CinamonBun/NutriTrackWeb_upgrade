<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IngredientController extends Controller
{
    /**
     * List ingredient
     */
    public function index(Request $request)
    {
        $query = Ingredient::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $ingredients = $query->get();

        return ApiResponse::success(
            $ingredients,
            'Ingredients fetched successfully'
        );
    }

    /**
     * Store ingredient
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'calories_per_100g' => 'required|numeric|min:0',
            'protein' => 'required|numeric|min:0',
            'carbs' => 'required|numeric|min:0',
            'fat' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error(
                'Validation error',
                $validator->errors(),
                422
            );
        }

        $ingredient = Ingredient::create($request->all());

        return ApiResponse::success(
            $ingredient,
            'Ingredient created successfully',
            201
        );
    }

    /**
     * Show ingredient
     */
    public function show(Ingredient $ingredient)
    {
        return ApiResponse::success(
            $ingredient,
            'Ingredient fetched successfully'
        );
    }

    /**
     * Update ingredient
     */
    public function update(Request $request, Ingredient $ingredient)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'calories_per_100g' => 'sometimes|numeric|min:0',
            'protein' => 'sometimes|numeric|min:0',
            'carbs' => 'sometimes|numeric|min:0',
            'fat' => 'sometimes|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error(
                'Validation error',
                $validator->errors(),
                422
            );
        }

        $ingredient->update($request->all());

        return ApiResponse::success(
            $ingredient,
            'Ingredient updated successfully'
        );
    }

    /**
     * Delete ingredient
     */
    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();

        return ApiResponse::success(
            null,
            'Ingredient deleted successfully'
        );
    }
}
