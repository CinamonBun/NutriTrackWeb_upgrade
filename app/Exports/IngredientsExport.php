<?php

namespace App\Exports;

use App\Models\Ingredient;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class IngredientsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Ingredient::select('name', 'calories_per_100g', 'protein', 'carbs', 'fat')->get();
    }

    public function headings(): array
    {
        return [
            'Name',
            'Calories (per 100g)',
            'Protein (g)',
            'Carbs (g)',
            'Fat (g)',
        ];
    }

    public function map($ingredient): array
    {
        return [
            $ingredient->name,
            $ingredient->calories_per_100g,
            $ingredient->protein,
            $ingredient->carbs,
            $ingredient->fat,
        ];
    }
}

