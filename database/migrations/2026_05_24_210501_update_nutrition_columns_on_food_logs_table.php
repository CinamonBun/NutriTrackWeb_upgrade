<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('food_logs', function (Blueprint $table) {
            // hapus kolom lama
            $table->dropColumn('calories_manual');

            // tambah snapshot nutrisi final
            $table->float('calories')->default(0)->after('name_manual');
            $table->float('protein')->default(0)->after('calories');
            $table->float('fat')->default(0)->after('protein');
            $table->float('carbohydrate')->default(0)->after('fat');
        });
    }

    public function down(): void
    {
        Schema::table('food_logs', function (Blueprint $table) {
            $table->dropColumn([
                'calories',
                'protein',
                'fat',
                'carbohydrate',
            ]);

            $table->float('calories_manual')->nullable();
        });
    }
};
