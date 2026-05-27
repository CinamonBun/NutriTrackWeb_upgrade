<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityPostLike extends Model
{
    protected $table = 'post_likes';
    protected $fillable = ['user_id', 'community_post_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(CommunityPost::class, 'community_post_id');
    }
}
