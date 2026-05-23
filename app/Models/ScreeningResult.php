<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScreeningResult extends Model
{
    use HasFactory;

    protected $table = 'screening_results';

    protected $fillable = [
        'user_id',
        'screening_type',
        'level',
        'total_score',
        'risk_factor_score',
        'symptom_score',
        'modifier_score',
        'answers',
        'timestamp',
    ];

    protected $casts = [
        'answers' => 'array',
        'timestamp' => 'datetime',
    ];

    /**
     * Relasi ke user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
