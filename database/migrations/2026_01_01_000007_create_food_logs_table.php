<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('food_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meal_log_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->foreignId('ingredient_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('recipe_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name_manual')->nullable();
            $table->float('calories_manual')->nullable();
            $table->float('quantity')->nullable();
        });
    }
    public function down() {
        Schema::dropIfExists('food_logs');
    }
};
