<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IngredientController extends Controller
{
    /**
     * Menampilkan daftar semua bahan makanan.
     * Bisa ditambah fitur pencarian berdasarkan nama.
     */
    public function index(Request $request)
    {
        $query = Ingredient::query();

        // Fitur pencarian: /api/ingredients?search=ayam
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get()
        ], 200);
    }

    /**
     * Menyimpan bahan makanan baru ke database.
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
            return response()->json($validator->errors(), 422);
        }

        $ingredient = Ingredient::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Ingredient created successfully',
            'data' => $ingredient
        ], 201);
    }

    /**
     * Menampilkan detail satu bahan makanan.
     */
    public function show(Ingredient $ingredient)
    {
        return response()->json([
            'status' => 'success',
            'data' => $ingredient
        ]);
    }

    /**
     * Update data bahan makanan.
     */
    public function update(Request $request, Ingredient $ingredient)
    {
        $ingredient->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Ingredient updated successfully',
            'data' => $ingredient
        ]);
    }

    /**
     * Menghapus bahan makanan.
     */
    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Ingredient deleted successfully'
        ], 204);
    }
}
