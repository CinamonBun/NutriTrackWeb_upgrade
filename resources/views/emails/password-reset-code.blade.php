<!DOCTYPE html>
<html>
<head>
    <title>Password Reset Code</title>
</head>
<body>
    <h2>Password Reset Verification</h2>

    <p>Hello,</p>

    <p>An admin (<strong>{{ $requestedBy }}</strong>) requested to reset your account password. To proceed, please share the following 6-digit verification code with them:</p>

    <h3 style="background-color: #f4f4f4; padding: 10px; display: inline-block; letter-spacing: 2px;">
        {{ $code }}
    </h3>

    <p>This code will expire in 15 minutes. If you did not request this, you can ignore this email.</p>

    <br>
    <p>Thank you,<br>NutriTrack Team</p>
</body>
</html>

