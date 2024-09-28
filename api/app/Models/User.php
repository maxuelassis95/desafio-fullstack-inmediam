<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    protected $table = 'users';

    protected $fillable = ['name', 'email'];

    public function contracts() {
        return $this->hasMany(Contract::class);
    }

}
