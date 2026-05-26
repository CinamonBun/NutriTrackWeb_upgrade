<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityPostComment extends Model
{
    protected $table = 'post_comments';
    protected $fillable = ['user_id', 'community_post_id', 'content', 'status'];

    public function reports()
    {
        return $this->morphMany(CommunityReport::class, 'reportable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(CommunityPost::class, 'community_post_id');
    }
}
