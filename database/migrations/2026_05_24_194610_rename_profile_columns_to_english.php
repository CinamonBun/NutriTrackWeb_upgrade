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

            // Rename anthropometry columns
            $table->renameColumn('tinggi_badan', 'height');
            $table->renameColumn('berat_badan', 'weight');

            $table->renameColumn('lingkar_pinggang', 'waist_circumference');
            $table->renameColumn('lingkar_pinggul', 'hip_circumference');

            // Rename demographic columns
            $table->renameColumn('jenis_kelamin', 'gender');
            $table->renameColumn('usia', 'age');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {

            // Restore original names
            $table->renameColumn('height', 'tinggi_badan');
            $table->renameColumn('weight', 'berat_badan');

            $table->renameColumn(
                'waist_circumference',
                'lingkar_pinggang'
            );

            $table->renameColumn(
                'hip_circumference',
                'lingkar_pinggul'
            );

            $table->renameColumn('gender', 'jenis_kelamin');
            $table->renameColumn('age', 'usia');
        });
    }
};
