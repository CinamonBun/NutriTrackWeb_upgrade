<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    public function index()
    {
        // Menampilkan resep milik user yang login beserta bahan-bahannya
        $recipes = Recipe::with('ingredients.ingredient')
            ->where('user_id', auth()->id())
            ->get();

        return response()->json(['data' => $recipes]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'is_favorite' => 'boolean',
            'desc' => 'nullable|string',
            'ingredients' => 'required|array',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity_gram' => 'required|numeric'
        ]);

        return DB::transaction(function () use ($request) {
            $recipe = Recipe::create([
                'user_id' => auth()->id(),
                'name' => $request->name,
                'is_favorite' => $request->is_favorite ?? false,
                'desc' => $request->desc
            ]);

            foreach ($request->ingredients as $item) {
                $recipe->ingredients()->create([
                    'ingredient_id' => $item['ingredient_id'],
                    'quantity_gram' => $item['quantity_gram']
                ]);
            }

            return response()->json(['message' => 'Resep berhasil dibuat', 'data' => $recipe->load('ingredients')], 201);
        });
    }

    public function show(Recipe $recipe)
    {
        $this->authorizeOwner($recipe);
        return response()->json(['data' => $recipe->load('ingredients.ingredient')]);
    }

    private function authorizeOwner(Recipe $recipe)
    {
        if ($recipe->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
    }
}
