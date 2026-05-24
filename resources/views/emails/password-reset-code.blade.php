<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">

    <div style="max-width:500px; margin:auto; background:white; padding:24px; border-radius:12px;">

        <h2 style="margin-top:0;">
            Reset Password
        </h2>

        <p>
            Halo {{ $requestedBy }},
        </p>

        <p>
            Gunakan kode OTP berikut untuk reset password akun Anda:
        </p>

        <div style="
            text-align:center;
            font-size:32px;
            font-weight:bold;
            letter-spacing:6px;
            margin:24px 0;
            color:#1AAA8A;
        ">
            {{ $code }}
        </div>

        <p>
            Kode ini berlaku selama <strong>10 menit</strong>.
        </p>

        <p style="color:#777;">
            Jika Anda tidak meminta reset password, abaikan email ini.
        </p>

    </div>

</body>
</html>
