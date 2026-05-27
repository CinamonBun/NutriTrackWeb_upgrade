<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('community_posts', 'status')) {
            Schema::table('community_posts', function (Blueprint $table) {
                $table->string('status')->default('active')->after('tag');
                $table->text('moderation_note')->nullable()->after('status');
                $table->foreignId('moderated_by')->nullable()->constrained('users')->nullOnDelete()->after('moderation_note');
                $table->timestamp('moderated_at')->nullable()->after('moderated_by');
            });
        }

        if (!Schema::hasColumn('post_comments', 'status')) {
            Schema::table('post_comments', function (Blueprint $table) {
                $table->string('status')->default('active')->after('content');
            });
        }

        if (!Schema::hasTable('community_reports')) {
        Schema::create('community_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporter_id')->constrained('users')->cascadeOnDelete();
            $table->morphs('reportable');
            $table->string('reason');
            $table->text('details')->nullable();
            $table->string('status')->default('pending');
            $table->text('admin_notes')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->unique(['reporter_id', 'reportable_type', 'reportable_id'], 'cm_reports_reporter_unique');
        });
        }

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

        if (Schema::hasTable('community_guidelines') && DB::table('community_guidelines')->exists()) {
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
        Schema::dropIfExists('community_reports');

        Schema::table('post_comments', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('community_posts', function (Blueprint $table) {
            $table->dropConstrainedForeignId('moderated_by');
            $table->dropColumn(['status', 'moderation_note', 'moderated_at']);
        });
    }
};
