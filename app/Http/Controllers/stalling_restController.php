<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Stalling_rest;
use Illuminate\Http\Request;

class stalling_restController extends Controller
{

    public function stallingCall()
    {
        $call = new Stalling_Rest();
        $stallingen = $call->getStallingen();
        return ($stallingen);
    }


}
