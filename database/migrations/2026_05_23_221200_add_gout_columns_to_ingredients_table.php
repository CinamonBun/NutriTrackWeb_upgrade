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
        Schema::table('ingredients', function (Blueprint $table) {

            // tingkat bahaya untuk asam urat
            $table->enum('gout_level', [
                'low',
                'medium',
                'high',
            ])->default('low');

            // apakah data diverifikasi ahli gizi/dokter
            $table->boolean('verified_by_expert')->default(false);

            // sumber data
            $table->string('source')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ingredients', function (Blueprint $table) {
            $table->dropColumn([
                'gout_level',
                'verified_by_expert',
                'source',
            ]);
        });
    }
};
