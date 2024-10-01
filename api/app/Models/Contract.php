<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $table = 'contracts';

    protected $fillable = [
        'user_id',
        'plan_id',
        'active',
        'note',
    ];

    public function payments() {
        return $this->hasMany(Payment::class);
    }

    public function plan() {
        return $this->belongsTo(Plan::class);
    }
}
