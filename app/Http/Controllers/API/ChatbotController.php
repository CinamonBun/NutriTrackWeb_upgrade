<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    /**
     * Send a message to the OpenClaw AI Gateway.
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = $request->input('message');
        
        // OpenClaw Gateway configuration
        // Default local port is 18789
        $openClawUrl = env('OPENCLAW_API_URL', 'http://127.0.0.1:18789/v1/chat/completions');
        $openClawToken = env('OPENCLAW_API_KEY', 'default'); // Default auth is token, can be anything if not configured in Gateway

        // Ambil data user yang sedang login beserta profilnya
        $user = $request->user();
        $profile = $user ? $user->profile : null;

        // Susun System Prompt (Instruksi Dasar AI)
        $systemPrompt = 'Kamu adalah asisten gizi cerdas bernama OpenClaw untuk aplikasi NutriTrack. Jawab pertanyaan pengguna dengan ramah, akurat, dan ringkas menggunakan bahasa Indonesia.';
        
        // Tambahkan konteks profil jika ada
        if ($user && $profile) {
            $systemPrompt .= "\n\nData Pengguna saat ini:";
            $systemPrompt .= "\nNama: " . $user->name;
            $systemPrompt .= "\nUsia: " . ($profile->usia ?? 'Tidak diketahui') . " tahun";
            $systemPrompt .= "\nJenis Kelamin: " . ($profile->jenis_kelamin ?? 'Tidak diketahui');
            $systemPrompt .= "\nTinggi Badan: " . ($profile->tinggi_badan ?? 'Tidak diketahui') . " cm";
            $systemPrompt .= "\nBerat Badan: " . ($profile->berat_badan ?? 'Tidak diketahui') . " kg";
            $systemPrompt .= "\nBMI: " . ($profile->bmi ?? 'Tidak diketahui');
            $systemPrompt .= "\n\nGunakan data ini untuk memberikan rekomendasi gizi yang sangat spesifik dan personal untuk pengguna.";
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $openClawToken,
                'Content-Type' => 'application/json',
            ])->post($openClawUrl, [
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $systemPrompt
                    ],
                    [
                        'role' => 'user',
                        'content' => $userMessage
                    ]
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                // Ambil pesan dari API response (OpenAI format)
                $aiMessage = $data['choices'][0]['message']['content'] ?? 'Maaf, saya tidak bisa merespons saat ini.';

                return response()->json([
                    'success' => true,
                    'message' => 'Pesan berhasil diterima.',
                    'data' => [
                        'reply' => $aiMessage,
                        //'raw' => $data // Uncomment ini jika mobile dev butuh format data mentahnya
                    ]
                ]);
            } else {
                Log::error('OpenClaw API Error: ' . $response->body());
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal terhubung ke agen AI. Pastikan OpenClaw berjalan dan API Key LLM sudah di-set.',
                    'error' => $response->body()
                ], 500);
            }

        } catch (\Exception $e) {
            Log::error('Chatbot Controller Exception: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem saat mencoba menghubungi AI.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
