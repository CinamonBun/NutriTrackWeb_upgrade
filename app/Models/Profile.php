<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    /**
     * Kolom yang boleh diisi mass assignment
     */
    protected $fillable = [
        'user_id',
        'tinggi_badan',
        'berat_badan',
        'bmi',
        'lingkar_pinggang',
        'lingkar_pinggul',
        'jenis_kelamin',
        'usia',
    ];

    /**
     * Relasi ke User (many-to-one)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Auto hitung BMI (optional helper)
     * BMI = berat(kg) / (tinggi(m)^2)
     */
    public function hitungBMI(): float
    {
        if (!$this->tinggi_badan || !$this->berat_badan) {
            return 0;
        }

        $tinggiMeter = $this->tinggi_badan / 100;

        return round($this->berat_badan / ($tinggiMeter ** 2), 2);
    }

    /**
     * Boot method untuk auto update BMI saat save
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($profile) {
            if ($profile->tinggi_badan && $profile->berat_badan) {
                $tinggiMeter = $profile->tinggi_badan / 100;
                $profile->bmi = round($profile->berat_badan / ($tinggiMeter ** 2), 2);
            }
        });
    }
}
