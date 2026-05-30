<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {

            $table->float('bmr')
                ->nullable()
                ->after('usia')
                ->comment('Basal Metabolic Rate');

            $table->float('tdee')
                ->nullable()
                ->after('bmr')
                ->comment('Total Daily Energy Expenditure');

            $table->enum('activity_level', [
                'sedentary',
                'light',
                'moderate',
                'active',
                'very_active'
            ])
                ->nullable()
                ->after('tdee');

            $table->float('target_calories')
                ->nullable()
                ->after('activity_level')
                ->comment('Target kalori harian');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {

            $table->dropColumn([
                'bmr',
                'tdee',
                'activity_level',
                'target_calories',
            ]);
        });
    }
};
