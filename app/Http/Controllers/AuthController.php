<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function createAccount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
            'role' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'message' => $validator->errors()
            ],401);
        }

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->role = $request->role;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'success'
        ],200);
    }
    //use this method to signin users
    public function signin(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'message' => 'Credentials are not correct'
            ],401);
        }

        if (!Auth::attempt($request->all())) {
            return response()->json([
                'status' => 401,
                'message' => 'Credentials are not correct',
                'user' => null
            ],401);
        }

        // $request->session()->regenerate();
        $user = $request->user();

        $tokenResult = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => 200,
            'access_token' => $tokenResult,
            'token_type' => 'Bearer',
            'user' => $user,
        ],200);
    }

    // this method signs out users by removing tokens
    public function signout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'status' => 200,
            'message' => 'You have been logged out'
        ];
    }

    public function user(Request $request)
    {
        return response()->json([
            'status' => 200,
            'user' => $request->user(),
        ]);
    }
}
