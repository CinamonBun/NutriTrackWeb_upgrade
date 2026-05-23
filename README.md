# 🍏 NutriTrack Backend (Laravel)

NutriTrack adalah aplikasi pemantauan gizi dan kesehatan cerdas yang dilengkapi dengan asisten AI personal. Repositori ini berisi kode *backend* (API) yang dibangun menggunakan kerangka kerja (framework) **Laravel**.

Aplikasi ini menyediakan sistem autentikasi, manajemen profil antropometri pengguna (tinggi, berat, BMI), pencatatan asupan gizi, resep sehat, serta terintegrasi secara langsung dengan kecerdasan buatan untuk memberikan konsultasi diet dan gizi yang dipersonalisasi.

---

## 🌟 Fitur Utama

- **Sistem Autentikasi Modern**: Login, Register, Verifikasi Email, dan Reset Password yang aman menggunakan Laravel Sanctum.
- **Kalkulasi Kesehatan Otomatis**: Secara otomatis menghitung BMI berdasarkan tinggi dan berat badan pengguna.
- **Manajemen Gizi & Resep**: Pencatatan riwayat makan (Food/Meal Logs) dan database bahan makanan (Ingredients).
- **🤖 AI Nutrition Assistant (Chatbot)**: Terintegrasi dengan **OpenClaw** & Google Gemini/Groq. AI secara otomatis membaca data profil *user* yang sedang *login* (umur, BMI, jenis kelamin) untuk memberikan rekomendasi menu makanan dan diet yang sangat akurat dan spesifik untuk setiap individu.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: Laravel 11.x
- **Database**: MySQL
- **Autentikasi API**: Laravel Sanctum
- **AI Orchestration**: [OpenClaw](https://openclaw.ai/) (Local AI Gateway)
- **Email/Notifikasi**: Resend (Reset Password OTP)

---

## 🚀 Panduan Instalasi (Development)

Ikuti langkah-langkah di bawah ini untuk menjalankan *backend* NutriTrack di komputer lokal Anda:

### 1. Kebutuhan Sistem (Prerequisites)
Pastikan komputer Anda sudah terinstal perangkat lunak berikut:
- PHP >= 8.2
- Composer
- MySQL (XAMPP/Laragon/DBngin)
- Node.js & NPM (untuk OpenClaw)

### 2. Kloning Repositori & Instalasi Dependensi
```bash
git clone <url-repository-anda>
cd NutriTrackWeb_upgrade
composer install
npm install
```

### 3. Pengaturan *Environment* (.env)
Salin file konfigurasi contoh dan sesuaikan dengan database Anda:
```bash
cp .env.example .env
php artisan key:generate
```
**PENTING!** Pastikan Anda membuat database baru bernama `nutritrack_upgrade` di MySQL Anda, lalu atur kredensialnya di file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nutritrack_upgrade
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Menjalankan Migrasi Database
Jalankan migrasi untuk membuat seluruh tabel yang dibutuhkan (termasuk tabel `profiles` dsb):
```bash
php artisan migrate
```

### 5. Setup AI Chatbot (OpenClaw)
Karena asisten cerdas kita membutuhkan OpenClaw, lakukan instalasi dan konfigurasi berikut di terminal Anda:
```bash
npm install -g openclaw@latest
openclaw models auth paste-token --provider google
# (Masukkan API Key Google Gemini Anda)
openclaw models set google/gemini-2.5-flash
openclaw config set gateway.http.endpoints.chatCompletions.enabled true
openclaw gateway restart
```
Kemudian, masukkan Token Gateway OpenClaw Anda ke bagian paling bawah file `.env` Laravel:
```env
OPENCLAW_API_KEY=kunci_token_gateway_openclaw_anda
```

### 6. Jalankan Server Lokal
Setelah semuanya siap, Anda bisa menghidupkan server Laravel:
```bash
php artisan serve
```
API sekarang bisa diakses di: `http://localhost:8000/api`

---

## 📖 Dokumentasi Endpoint API Penting

- `POST /api/login`: Mendapatkan Token Akses (Sanctum)
- `POST /api/register`: Mendaftar akun baru
- `GET /api/profile`: Mengambil data antropometri pengguna
- `POST /api/chatbot`: (Membutuhkan Header `Authorization: Bearer <token>`). Mengirimkan pesan ke AI. AI akan merespons berdasarkan profil kesehatan user saat ini.

---

**Dibuat dengan ❤️ untuk Kesehatan yang Lebih Baik.**
