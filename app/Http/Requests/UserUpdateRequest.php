<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class UserUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules(Request $request)
    {
        $id = $request->id;
        return [
            'email' => ['required','email', Rule::unique('users', 'email')->ignore($id)],
            'name' => ['required','string'],
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
