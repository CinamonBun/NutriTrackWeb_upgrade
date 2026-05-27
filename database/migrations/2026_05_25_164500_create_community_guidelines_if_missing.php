<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('community_guidelines')) {
            Schema::create('community_guidelines', function (Blueprint $table) {
                $table->id();
                $table->string('icon')->nullable();
                $table->text('content');
                $table->unsignedInteger('sort_order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (DB::table('community_guidelines')->exists()) {
            return;
        }

        $now = now();
        DB::table('community_guidelines')->insert([
            ['icon' => 'fas fa-hand-holding-heart', 'content' => 'Saling menghargai dan mendukung sesama anggota.', 'sort_order' => 1, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['icon' => 'fas fa-shield-alt', 'content' => 'Dilarang membagikan informasi kesehatan yang menyesatkan.', 'sort_order' => 2, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['icon' => 'fas fa-ban', 'content' => 'Tidak ada konten yang bersifat promosi atau spam.', 'sort_order' => 3, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['icon' => 'fas fa-user-check', 'content' => 'Gunakan bahasa yang sopan dan inklusif.', 'sort_order' => 4, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['icon' => 'fas fa-flag', 'content' => 'Laporkan konten yang melanggar kepada moderator.', 'sort_order' => 5, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('community_guidelines');
    }
};
