<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|unique:users,email',
            'phone' => 'nullable|string|unique:users,phone',
            'password' => 'required|string|min:8',
            'business_name' => 'required|string',
            'location' => 'required|string',
            'business_category' => 'required|string',
            'account_type' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->business_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'business_name' => $request->business_name,
            'location' => $request->location,
            'business_category' => $request->business_category,
            'account_type' => $request->account_type ?? 'UMKM',
        ]);

        // Create default accounts for new user
        $defaultAccounts = ['Tunai', 'BNI', 'BRI', 'Bank Mandiri'];
        foreach ($defaultAccounts as $name) {
            Account::create([
                'user_id' => $user->id,
                'name' => $name,
                'initial_balance' => 0.00,
                'balance' => 0.00,
                'is_visible' => true,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Registrasi berhasil.',
            'data' => [
                'token' => $token,
                'user' => $user,
            ]
        ], 201);
    }

    /**
     * Authenticate a user and return a token.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau password salah.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil.',
            'data' => [
                'token' => $token,
                'user' => $user,
            ]
        ], 200);
    }

    /**
     * Authenticate or register a user using Google OAuth credentials.
     */
    public function googleLogin(Request $request)
    {
        $googleId = null;
        $email = null;
        $name = null;

        if ($request->has('id_token')) {
            // Validate the id_token securely with Google's API
            $response = Http::get('https://oauth2.googleapis.com/tokeninfo', [
                'id_token' => $request->id_token,
            ]);

            if ($response->failed()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token Google tidak valid atau kedaluwarsa.',
                ], 401);
            }

            $payload = $response->json();

            // Verify the issuer is Google
            $iss = $payload['iss'] ?? '';
            if ($iss !== 'accounts.google.com' && $iss !== 'https://accounts.google.com') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token penerbit (issuer) tidak valid.',
                ], 401);
            }

            $googleId = $payload['sub'] ?? null;
            $email = $payload['email'] ?? null;
            $name = $payload['name'] ?? null;
        } else {
            // Fallback to raw inputs for mocking/sandbox testing
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'name' => 'required|string',
                'google_id' => 'required|string',
                'business_name' => 'nullable|string',
                'location' => 'nullable|string',
                'business_category' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal.',
                    'errors' => $validator->errors()
                ], 422);
            }

            $googleId = $request->google_id;
            $email = $request->email;
            $name = $request->name;
        }

        if (!$googleId || !$email) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data Google tidak lengkap.',
            ], 400);
        }

        // Try to find user by google_id first
        $user = User::where('google_id', $googleId)->first();

        if (!$user) {
            // Check if user exists with this email
            $user = User::where('email', $email)->first();

            if ($user) {
                // Link Google account
                $user->google_id = $googleId;
                if (!$user->name) {
                    $user->name = $name;
                }
                $user->save();
            } else {
                // Create new user
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'google_id' => $googleId,
                    'business_name' => $request->business_name ?? 'Usaha ' . $name,
                    'location' => $request->location ?? 'Belum Diatur',
                    'business_category' => $request->business_category ?? 'Lainnya',
                    'account_type' => 'UMKM',
                ]);

                // Create default accounts for new user
                $defaultAccounts = ['Tunai', 'BNI', 'BRI', 'Bank Mandiri'];
                foreach ($defaultAccounts as $accName) {
                    Account::create([
                        'user_id' => $user->id,
                        'name' => $accName,
                        'initial_balance' => 0.00,
                        'balance' => 0.00,
                        'is_visible' => true,
                    ]);
                }
            }
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login Google berhasil.',
            'data' => [
                'token' => $token,
                'user' => $user,
            ]
        ], 200);
    }

    /**
     * Get the authenticated user's profile.
     */
    public function profile(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => $request->user(),
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone' => 'required|string|unique:users,phone,' . $user->id,
            'email' => 'required|email|unique:users,email,' . $user->id,
            'gender' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors()
            ], 422);
        }

        $user->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'gender' => $request->gender,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Profil berhasil diperbarui.',
            'data' => $user,
        ]);
    }
}
