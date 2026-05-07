<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserActionVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $code;
    public string $requestedBy;
    public string $action;

    public function __construct(string $code, string $requestedBy, string $action)
    {
        $this->code = $code;
        $this->requestedBy = $requestedBy;
        $this->action = $action;
    }

    public function envelope(): Envelope
    {
        $subjectAction = $this->action === 'delete' ? 'Delete User' : 'Edit User';

        return new Envelope(
            subject: "{$subjectAction} Verification Code",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.user-action-verification',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

