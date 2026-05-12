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
        Schema::table('admin_audit_logs', function (Blueprint $table) {
            // Drop existing foreign keys
            $table->dropForeign(['actor_id']);
            $table->dropForeign(['target_id']);

            // Make columns nullable
            $table->unsignedBigInteger('actor_id')->nullable()->change();
            $table->unsignedBigInteger('target_id')->nullable()->change();

            // Re‑add foreign keys with SET NULL on delete
            $table->foreign('actor_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('target_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('admin_audit_logs', function (Blueprint $table) {
            // Drop the SET NULL foreign keys
            $table->dropForeign(['actor_id']);
            $table->dropForeign(['target_id']);

            // Re‑add original foreign keys with cascade delete
            $table->foreign('actor_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('target_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Re‑make columns non‑nullable (optional, keep data integrity)
            $table->unsignedBigInteger('actor_id')->nullable(false)->change();
            $table->unsignedBigInteger('target_id')->nullable(false)->change();
        });
    }
};
