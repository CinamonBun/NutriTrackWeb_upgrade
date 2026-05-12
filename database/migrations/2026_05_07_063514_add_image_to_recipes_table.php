<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('recipes', function (Blueprint $table) {
            Schema::table('recipes', function (Blueprint $table) {
                $table->string('image')->nullable()->after('name');
                // sesuaikan 'after' dengan kolom yang ada
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recipes', function (Blueprint $table) {
            Schema::table('recipes', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        });
    }
};
