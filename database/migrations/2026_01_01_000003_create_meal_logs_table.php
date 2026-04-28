<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('meal_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('meal_type');
            $table->float('total_calories')->nullable();
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('meal_logs');
    }
};
