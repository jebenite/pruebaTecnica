<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;



class MailController extends Controller
{

    public function send()
    {
        $to_name = 'To1';
        $to_email = 'isabelpizarro888@gmail.com';
        $data = ['name'=>'Ogbonna Vitalis(sender_name)', 'body'=>' A test mail'];
        Mail::send('emails.mail', $data, function($message) use ($to_name, $to_email) {
            $message->to($to_email, $to_name)
            ->subject('Laravel Test');
            });
            return response()->json('enviado');
    }

}
