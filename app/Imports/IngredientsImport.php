<?php

namespace App\Imports;

use App\Models\Ingredient;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class IngredientsImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Ingredient([
            'name' => $row['name'],
            'calories_per_100g' => $row['calories_per_100g'],
            'protein' => $row['protein'],
            'carbs' => $row['carbs'],
            'fat' => $row['fat'],
        ]);
    }
}

