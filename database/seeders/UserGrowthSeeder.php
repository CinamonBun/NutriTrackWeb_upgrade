<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserGrowthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menambahkan user untuk 7 hari terakhir agar graph terisi
        for ($i = 0; $i <= 7; $i++) {
            // Jumlah user random per hari (misal 1 sampai 15 user per hari)
            $userCount = rand(1, 15);
            $date = Carbon::now()->subDays($i);

            User::factory($userCount)->create([
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }
    }
}
