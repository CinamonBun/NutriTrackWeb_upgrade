<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('moods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('mood_level');
            $table->integer('stress_level');
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('moods');
    }
};
