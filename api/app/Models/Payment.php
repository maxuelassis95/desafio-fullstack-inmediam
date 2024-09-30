<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'contract_id', 
        'amount',
        'status', 
        'payment_method'
    ];

    public function contract() {
        return $this->belongsTo(Contract::class);
    }

}
