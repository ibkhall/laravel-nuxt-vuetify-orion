<?php

namespace App\Http\Requests;

use Orion\Http\Requests\Request;

class userRequest extends Request
{
    public function storeRules() : array
    {
        return [
            'name' => 'required|string|min:3|unique:users,name',
            'email' => 'required|email|unique:users,email',
        ];
    }

    public function updateRules() : array
    {
        return [
            'name' => 'required|string|min:3|unique:users,name,'.$this->route()->parameter('user'),
            'email' => 'required|email|unique:users,email,'.$this->route()->parameter('user'),
        ];
    }
}
