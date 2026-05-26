<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityPost extends Model
{
    public const STATUSES = ['active', 'hidden', 'removed'];

    protected $fillable = [
        'user_id',
        'content',
        'tag',
        'likes_count',
        'status',
        'moderation_note',
        'moderated_by',
        'moderated_at',
    ];

    protected $casts = [
        'moderated_at' => 'datetime',
    ];

    public function scopeVisible($query)
    {
        return $query->where('status', 'active');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(CommunityPostLike::class);
    }

    public function comments()
    {
        return $this->hasMany(CommunityPostComment::class);
    }

    public function saves()
    {
        return $this->hasMany(CommunityPostSave::class);
    }

    public function reports()
    {
        return $this->morphMany(CommunityReport::class, 'reportable');
    }

    public function moderator()
    {
        return $this->belongsTo(User::class, 'moderated_by');
    }
}
