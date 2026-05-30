<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',

        // anthropometry
        'height',
        'weight',
        'bmi',

        'waist_circumference',
        'hip_circumference',

        // personal
        'gender',
        'age',

        // nutrition
        'bmr',
        'tdee',
        'activity_level',
        'goal',
        'target_calories',

        // macronutrients
        'protein_target',
        'fat_target',
        'carbohydrate_target',
    ];

    protected $casts = [
        'height' => 'float',
        'weight' => 'float',
        'bmi' => 'float',

        'waist_circumference' => 'float',
        'hip_circumference' => 'float',

        'bmr' => 'float',
        'tdee' => 'float',
        'target_calories' => 'float',

        'protein_target' => 'float',
        'fat_target' => 'float',
        'carbohydrate_target' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * BMI
     */
    public function calculateBMI(): float
    {
        if (!$this->height || !$this->weight) {
            return 0;
        }

        $heightMeter = $this->height / 100;

        return round(
            $this->weight / ($heightMeter ** 2),
            2
        );
    }

    /**
     * BMR - Mifflin St Jeor
     */
    public function calculateBMR(): float
    {
        if (
            !$this->weight ||
            !$this->height ||
            !$this->age ||
            !$this->gender
        ) {
            return 0;
        }

        if ($this->gender === 'male') {
            return round(
                (10 * $this->weight) +
                    (6.25 * $this->height) -
                    (5 * $this->age) +
                    5,
                2
            );
        }

        return round(
            (10 * $this->weight) +
                (6.25 * $this->height) -
                (5 * $this->age) -
                161,
            2
        );
    }

    /**
     * TDEE
     */
    public function calculateTDEE(): float
    {
        $factors = [
            'sedentary' => 1.2,
            'light' => 1.375,
            'moderate' => 1.55,
            'active' => 1.725,
            'very_active' => 1.9,
        ];

        $factor = $factors[$this->activity_level] ?? 1.2;

        return round(
            $this->calculateBMR() * $factor,
            2
        );
    }

    /**
     * Daily calorie target
     */
    public function calculateTargetCalories(
        string $goal = 'maintain'
    ): float {
        $tdee = $this->calculateTDEE();

        return match ($goal) {
            'cutting' => round($tdee * 0.8, 2),
            'bulking' => round($tdee * 1.1, 2),
            default => round($tdee, 2),
        };
    }

    /**
     * Macronutrient calculation
     *
     * Protein  : 30%
     * Fat      : 25%
     * Carbs    : 45%
     */
    public function calculateMacros(): array
    {
        $calories = $this->target_calories ?? 0;

        $proteinCalories = $calories * 0.30;
        $fatCalories = $calories * 0.25;
        $carbCalories = $calories * 0.45;

        return [
            'protein_target' => round($proteinCalories / 4, 2),
            'fat_target' => round($fatCalories / 9, 2),
            'carbohydrate_target' => round($carbCalories / 4, 2),
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($profile) {

            // BMI
            if ($profile->height && $profile->weight) {

                $heightMeter = $profile->height / 100;

                $profile->bmi = round(
                    $profile->weight / ($heightMeter ** 2),
                    2
                );
            }

            // BMR
            $profile->bmr = $profile->calculateBMR();

            // TDEE
            $profile->tdee = $profile->calculateTDEE();

            // Calories
            $profile->target_calories =
                $profile->calculateTargetCalories(
                    $profile->goal ?? 'maintain'
                );

            // Macros
            $macros = $profile->calculateMacros();

            $profile->protein_target =
                $macros['protein_target'];

            $profile->fat_target =
                $macros['fat_target'];

            $profile->carbohydrate_target =
                $macros['carbohydrate_target'];
        });
    }
}
