<?php

use App\Models\User;

if(!function_exists('getUser')) {
    function getUser(): ?User {
        return User::first();
    }
}