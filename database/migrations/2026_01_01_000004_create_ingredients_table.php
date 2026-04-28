<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('calories_per_100g');
            $table->float('protein')->nullable();
            $table->float('carbs')->nullable();
            $table->float('fat')->nullable();
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('ingredients');
    }
};
