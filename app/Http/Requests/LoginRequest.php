<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => ['required','email'],
            'password' => ['required','string'],
        ];
    }
    
    public function messages()
    {
        return [
            'email.email' => 'The input is not valid E-mail!.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = response()
            ->json([
                'mensaje' => 'Error',
                'datos' => $validator->errors()->messages(),
            ], 422);
        throw (new ValidationException($validator, $response));
    }
}
