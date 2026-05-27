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

            $table->float('protein_target')
                ->nullable()
                ->after('target_calories')
                ->comment('Daily protein target in grams');

            $table->float('fat_target')
                ->nullable()
                ->after('protein_target')
                ->comment('Daily fat target in grams');

            $table->float('carbohydrate_target')
                ->nullable()
                ->after('fat_target')
                ->comment('Daily carbohydrate target in grams');

            $table->enum('goal', [
                'cutting',
                'maintain',
                'bulking'
            ])
                ->nullable()
                ->after('activity_level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {

            $table->dropColumn([
                'protein_target',
                'fat_target',
                'carbohydrate_target',
                'goal',
            ]);
        });
    }
};
