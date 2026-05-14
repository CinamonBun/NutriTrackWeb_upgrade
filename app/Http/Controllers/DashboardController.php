<?php

namespace App\Http\Controllers;

use App\Models\AdminAuditLog;
use App\Models\FoodLog;
use App\Models\Ingredient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Basic Stats
        $totalUsers = User::count();
        $totalIngredients = Ingredient::count();
        $totalFoodLogs = FoodLog::count();
        
        // Active users in last 24h (those who logged food)
        $activeUsersCount = DB::table('food_logs')
            ->join('meal_logs', 'food_logs.meal_log_id', '=', 'meal_logs.id')
            ->where('meal_logs.created_at', '>=', Carbon::now()->subDay())
            ->distinct('meal_logs.user_id')
            ->count('meal_logs.user_id');

        // 2. Growth Data (Last 7 Days)
        $growthData = User::selectRaw('DATE(created_at) as date, count(*) as count')
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => Carbon::parse($item->date)->format('D, M d'),
                    'users' => $item->count,
                ];
            });

        // 3. Top Ingredients (Engagement)
        $topIngredients = FoodLog::select('ingredient_id', DB::raw('count(*) as total'))
            ->whereNotNull('ingredient_id')
            ->with('ingredient:id,name')
            ->groupBy('ingredient_id')
            ->orderBy('total', 'desc')
            ->take(5)
            ->get()
            ->map(function ($log) {
                return [
                    'name' => $log->ingredient->name ?? 'Unknown',
                    'count' => $log->total,
                ];
            });

        // 4. Existing Audit Logs
        $auditLogs = AdminAuditLog::with(['actor', 'target'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'activeUsers' => $activeUsersCount,
                'totalIngredients' => $totalIngredients,
                'totalFoodLogs' => $totalFoodLogs,
            ],
            'growthData' => $growthData,
            'topIngredients' => $topIngredients,
            'auditLogs' => $auditLogs,
        ]);
    }
}
