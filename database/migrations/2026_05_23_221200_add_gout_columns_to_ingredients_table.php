<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('ingredients', 'gout_level')) {
            Schema::table('ingredients', function (Blueprint $table) {
                $table->enum('gout_level', [
                    'low',
                    'medium',
                    'high',
                ])->default('low');
            });
        }

        if (!Schema::hasColumn('ingredients', 'verified_by_expert')) {
            Schema::table('ingredients', function (Blueprint $table) {
                $table->boolean('verified_by_expert')->default(false);
            });
        }

        if (!Schema::hasColumn('ingredients', 'source')) {
            Schema::table('ingredients', function (Blueprint $table) {
                $table->string('source')->nullable();
            });
        }
    }

    public function down(): void
    {
        Schema::table('ingredients', function (Blueprint $table) {
            $columns = array_filter([
                Schema::hasColumn('ingredients', 'gout_level') ? 'gout_level' : null,
                Schema::hasColumn('ingredients', 'verified_by_expert') ? 'verified_by_expert' : null,
                Schema::hasColumn('ingredients', 'source') ? 'source' : null,
            ]);

            if ($columns) {
                $table->dropColumn($columns);
            }
        });
    }
};
