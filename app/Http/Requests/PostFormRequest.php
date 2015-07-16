<?php
/**
 * Created by PhpStorm.
 * User: adriel
 * Date: 16-7-15
 * Time: 17:24
 */

namespace App\Http\Requests;

use App\Http\Requests\Request;
use App\User;
use Auth;

class PostFormRequest extends Request {

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if($this->user()->can_post())
        {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|unique:posts|max:255',
            'title' => array('Regex:/^[A-Za-z0-9 ]+$/'),
            'body' => 'required',
        ];
    }
}