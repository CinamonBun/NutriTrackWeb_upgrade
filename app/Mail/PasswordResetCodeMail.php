<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $code;
    public string $requestedBy;

    public function __construct(string $code, string $requestedBy)
    {
        $this->code = $code;
        $this->requestedBy = $requestedBy;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Password Reset Verification Code',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.password-reset-code',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

