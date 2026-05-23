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
        Schema::create('screening_results', function (Blueprint $table) {
            $table->id();

            // relasi user (optional)
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // gout / diabetes / heart
            $table->string('screening_type');

            // Risiko Rendah / Sedang / Tinggi
            $table->string('level');

            $table->integer('total_score')->default(0);
            $table->integer('risk_factor_score')->default(0);
            $table->integer('symptom_score')->default(0);
            $table->integer('modifier_score')->default(0);

            // semua jawaban screening
            $table->json('answers');

            // waktu screening
            $table->timestamp('timestamp');

            $table->timestamps();

            // indexing
            $table->index('screening_type');
            $table->index('level');
            $table->index('timestamp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('screening_results');
    }
};
