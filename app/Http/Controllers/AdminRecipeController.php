<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Services\RecipeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminRecipeController extends Controller
{
    public function index(Request $request)
    {
        $query = Recipe::query()
            ->with(['ingredients.ingredient:id,name,calories_per_100g,protein,carbs,fat,gout_level'])
            ->where('user_id', $request->user()->id);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $recipes = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        $recipes->getCollection()->transform(function (Recipe $recipe) {
            $recipe->setAttribute('nutrition', $recipe->nutritionTotals());

            return $recipe;
        });

        $ingredientOptions = Ingredient::query()
            ->select(['id', 'name', 'calories_per_100g', 'protein', 'carbs', 'fat', 'gout_level'])
            ->orderBy('name')
            ->get();

        return Inertia::render('Recipes/Index', [
            'recipes' => $recipes,
            'filters' => $request->only(['search']),
            'ingredientOptions' => $ingredientOptions,
        ]);
    }

    public function store(Request $request, RecipeService $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string',
            'is_favorite' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'ingredients' => 'required|array',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity_gram' => 'required|numeric|min:0.01',
        ]);

        $recipeData = [
            'user_id' => (int)$request->user()->id,
            'name' => $validated['name'],
            'desc' => $validated['desc'] ?? null,
            'is_favorite' => (bool)($validated['is_favorite'] ?? false),
        ];

        if ($request->hasFile('image')) {
            $recipeData['image'] = $request->file('image')->store('recipes', 'public');
        }

        $service->createWithIngredients($recipeData, $validated['ingredients']);

        return redirect()->route('admin.recipes.index')->with('success', 'Recipe created successfully.');
    }

    public function update(Request $request, Recipe $recipe, RecipeService $service)
    {
        abort_unless((int)$recipe->user_id === (int)$request->user()->id, 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string',
            'is_favorite' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'ingredients' => 'required|array',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity_gram' => 'required|numeric|min:0.01',
        ]);

        $recipeData = [
            'name' => $validated['name'],
            'desc' => $validated['desc'] ?? null,
            'is_favorite' => (bool)($validated['is_favorite'] ?? false),
        ];

        if ($request->hasFile('image')) {
            if ($recipe->image) {
                Storage::disk('public')->delete($recipe->image);
            }

            $recipeData['image'] = $request->file('image')->store('recipes', 'public');
        }

        $service->updateWithIngredients($recipe, $recipeData, $validated['ingredients']);

        return redirect()->route('admin.recipes.index')->with('success', 'Recipe updated successfully.');
    }

    public function destroy(Request $request, Recipe $recipe)
    {
        abort_unless((int)$recipe->user_id === (int)$request->user()->id, 403);

        if ($recipe->image) {
            Storage::disk('public')->delete($recipe->image);
        }

        $recipe->delete();

        return redirect()->route('admin.recipes.index')->with('success', 'Recipe deleted successfully.');
    }
}

