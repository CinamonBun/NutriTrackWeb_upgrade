<!DOCTYPE html>
<html>
<head>
    <title>User Action Verification Code</title>
</head>
<body>
    <h2>Security Verification</h2>

    <p>Hello,</p>

    <p>
        An admin account (<strong>{{ $requestedBy }}</strong>) requested a verification code to
        <strong>{{ $action === 'edit' ? 'edit a user' : 'perform an action' }}</strong>.
        Use the following 6-digit code to continue:
    </p>

    <h3 style="background-color: #f4f4f4; padding: 10px; display: inline-block; letter-spacing: 2px;">
        {{ $code }}
    </h3>

    <p>This code will expire in 15 minutes. If you did not expect this, you can ignore this email.</p>

    <br>
    <p>Thank you,<br>NutriTrack Team</p>
</body>
</html>

