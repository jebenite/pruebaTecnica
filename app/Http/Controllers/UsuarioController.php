<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Input;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\NewPassWordRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Exception;

class UsuarioController extends Controller
{

    public function login(LoginRequest $request)
    {
        try { 
            $res= Auth::attempt($request->all());
            if(!$res){
                $resultado=[
                    "status"=> "400",
                    "mensaje"=> "Email or Password doesn't match",
                    "datos"=> null
                ];
                return response()->json($resultado, 400);
            }
            $user = $request->user();
            $dataUser=[
                'id'=> $user->id,
                'name'=> $user->name,
                'specialist'=> $user->specialist,
            ];
            $tokenResult = $user->createToken('Personal Access Token');
            return response()->json([
                'status' => 200,
                'datos' => $tokenResult->accessToken,
                'dataUser'=> $dataUser,
                'mensaje'=> 'Welcome'
            ], 200);
        } catch (Exception $e) { 
            $resultado=[
                "mensaje"=> "Wrong",
                "datos"=> null
            ];
            return response()->json($resultado, 400);
        }
    }

    public function newpassword(NewPassWordRequest $request)
    {
        try { 
            $res= Auth::attempt($request->all());
            if(!$res){
                $resultado=[
                    "status"=> "400",
                    "mensaje"=> "Email or Password doesn't match",
                    "datos"=> null
                ];
                return response()->json($resultado, 400);
            }
            $user = $request->user();
            $user->password= bcrypt($request->password_new);
            $user->save();
            return response()->json([
                'status' => 200,
                'datos' => null,
                'mensaje'=> 'Password changed!'
            ], 200);
        } catch (Exception $e) { 
            $resultado=[
                "mensaje"=> "Wrong",
                "datos"=> null
            ];
            return response()->json($resultado, 400);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->token()->revoke();
            return response()->json([
                'status' => 200,
                'datos' => '',
                'mensaje'=> 'Log out succesfully!'
            ], 200);
        } catch (Exception $e) { 
            $resultado=[
                "mensaje"=> "Wrong",
                "datos"=> null
            ];
            return response()->json($resultado, 400);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try { 
            $busqueda = Input::get('busqueda');
            $usuarios= User::
            where(function($query) use ($busqueda){
                $query->where('name','like','%'.$busqueda.'%')->orWhere('email','like','%'.$busqueda.'%')
                ->orWhere('phone','like','%'.$busqueda.'%')->orWhere('specialist','like','%'.$busqueda.'%');
            })->orderBy('name')
            ->paginate(15);
            $resultado=[
                "mensaje"=> "Users",
                "datos"=> $usuarios
            ];
            return response()->json($resultado, 200);
        } catch (Exception $e) { 
            $resultado=[
                "mensaje"=> "Wrong",
                "datos"=> null
            ];
            return response()->json($resultado, 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserStoreRequest $request)
    {
        try { 
            $request['password']= bcrypt($request->password);
            $usuario= new User($request->all());
            $usuario->save();
            $resultado=[
                "mensaje"=> "User added, now you can login in!",
                "datos"=> null
            ];
            return response()->json($resultado, 200);
        } catch (Exception $e) { 
            $resultado=[
                "mensaje"=> "Wrong",
                "datos"=> null
            ];
            return response()->json($resultado, 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, $id)
    {
        try { 
            $usuario= User::find($id);
            $usuario->update($request->all());
            $resultado=[
                "status"=> 200,
                "mensaje"=> "User updated",
                "datos"=> null
            ];
            return response()->json($resultado, 200);
        } catch (Exception $e) { 
            $resultado=[
                "mensaje"=> "Wrong",
                "datos"=> null
            ];
            return response()->json($resultado, 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try { 
            $usuario= User::find($id);
            $usuario->delete();
            $resultado=[
                "mensaje"=> "User deleted",
                "datos"=> null
            ];
            return response()->json($resultado, 200);
        } catch (Exception $e) { 
            $resultado=[
                "mensaje"=> "Wrong",
                "datos"=> null
            ];
            return response()->json($resultado, 400);
        }
    }
}
