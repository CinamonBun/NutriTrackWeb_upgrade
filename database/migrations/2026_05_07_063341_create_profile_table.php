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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();

            // Relasi ke users (one-to-one)
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // Data antropometri / kesehatan
            $table->float('tinggi_badan')->comment('cm');
            $table->float('berat_badan')->comment('kg');
            $table->float('bmi')->nullable()->comment('Body Mass Index');

            $table->float('lingkar_pinggang')->nullable()->comment('cm');
            $table->float('lingkar_pinggul')->nullable()->comment('cm');

            // optional tambahan (kalau dibutuhkan nanti)
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable();
            $table->integer('usia')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
