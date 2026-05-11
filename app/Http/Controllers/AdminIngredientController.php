<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\IngredientsExport;
use App\Imports\IngredientsImport;

class AdminIngredientController extends Controller
{
    public function index()
    {
        $ingredients = Ingredient::orderBy('name')->get();
        return Inertia::render('Ingredients/Index', [
            'ingredients' => $ingredients
        ]);
    }

    public function export()
    {
        return Excel::download(new IngredientsExport, 'ingredients.xlsx');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv'
        ]);

        Excel::import(new IngredientsImport, $request->file('file'));

        return redirect()->route('admin.ingredients.index')->with('success', 'Ingredients imported successfully.');
    }

    public function store(Request $request)

    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'calories_per_100g' => 'required|numeric|min:0',
            'protein' => 'required|numeric|min:0',
            'carbs' => 'required|numeric|min:0',
            'fat' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('ingredients', 'public');
            $validated['image'] = $imagePath;
        }

        Ingredient::create($validated);

        return redirect()->route('admin.ingredients.index')->with('success', 'Ingredient created successfully.');
    }

    public function update(Request $request, Ingredient $ingredient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'calories_per_100g' => 'required|numeric|min:0',
            'protein' => 'required|numeric|min:0',
            'carbs' => 'required|numeric|min:0',
            'fat' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($ingredient->image) {
                Storage::disk('public')->delete($ingredient->image);
            }
            $imagePath = $request->file('image')->store('ingredients', 'public');
            $validated['image'] = $imagePath;
        }

        $ingredient->update($validated);

        return redirect()->route('admin.ingredients.index')->with('success', 'Ingredient updated successfully.');
    }

    public function destroy(Ingredient $ingredient)
    {
        if ($ingredient->image) {
            Storage::disk('public')->delete($ingredient->image);
        }
        $ingredient->delete();

        return redirect()->route('admin.ingredients.index')->with('success', 'Ingredient deleted successfully.');
    }
}
