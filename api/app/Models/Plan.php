<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{

    protected $table = 'plans';
    protected $fillable = [
        'description',
        'numberOfClients',
        'gigabytesStorage',
        'price',
        'active'
    ];

    public function contracts() {
        return $this->hasMany(Plan::class);
    }

}
