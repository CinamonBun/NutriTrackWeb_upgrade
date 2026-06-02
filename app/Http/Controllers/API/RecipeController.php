<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Recipe;
use App\Services\RecipeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    private function recipeWithNutrition(Recipe $recipe): array
    {
        $data = $recipe->toArray();
        $data['nutrition'] = $recipe->nutritionTotals();

        return $data;
    }

    public function index(Request $request)
    {
        $recipes = Recipe::with('ingredients.ingredient')
            ->where('user_id', auth()->id())
            ->latest()
            ->get()
            ->map(fn (Recipe $recipe) => $this->recipeWithNutrition($recipe));

        return response()->json(['data' => $recipes]);
    }

    public function store(Request $request, RecipeService $service)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'is_favorite' => 'boolean',
            'desc' => 'nullable|string',
            'ingredients' => 'required|array',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity_gram' => 'required|numeric|min:0.01',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $recipeData = [
            'user_id' => (int)$request->user()->id,
            'name' => $validated['name'],
            'is_favorite' => (bool)($validated['is_favorite'] ?? false),
            'desc' => $validated['desc'] ?? null,
        ];

        if ($request->hasFile('image')) {
            $recipeData['image'] = $request->file('image')->store('recipes', 'public');
        }

        $recipe = $service->createWithIngredients($recipeData, $validated['ingredients']);

        return response()->json([
            'message' => 'Resep berhasil dibuat',
            'data' => $this->recipeWithNutrition($recipe),
        ], 201);
    }

    public function show($id)
    {
        $recipe = Recipe::with('ingredients.ingredient')
            ->where('user_id', auth()->id())
            ->find($id);

        if (!$recipe) {
            return response()->json([
                'message' => 'Recipe tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'data' => $this->recipeWithNutrition($recipe),
        ]);
    }

    public function update(Request $request, Recipe $recipe, RecipeService $service)
    {
        abort_unless((int)$recipe->user_id === (int)$request->user()->id, 403);

        $validated = $request->validate([
            'name' => 'required|string',
            'is_favorite' => 'boolean',
            'desc' => 'nullable|string',
            'ingredients' => 'required|array',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity_gram' => 'required|numeric|min:0.01',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $recipeData = [
            'name' => $validated['name'],
            'is_favorite' => (bool)($validated['is_favorite'] ?? false),
            'desc' => $validated['desc'] ?? null,
        ];

        if ($request->hasFile('image')) {
            if ($recipe->image) {
                Storage::disk('public')->delete($recipe->image);
            }
            $recipeData['image'] = $request->file('image')->store('recipes', 'public');
        }

        $updated = $service->updateWithIngredients($recipe, $recipeData, $validated['ingredients']);

        return response()->json([
            'message' => 'Resep berhasil diperbarui',
            'data' => $this->recipeWithNutrition($updated),
        ]);
    }

    public function destroy(Request $request, Recipe $recipe)
    {
        abort_unless((int)$recipe->user_id === (int)$request->user()->id, 403);

        if ($recipe->image) {
            Storage::disk('public')->delete($recipe->image);
        }

        $recipe->delete();

        return response()->json(['message' => 'Resep berhasil dihapus']);
    }
}
