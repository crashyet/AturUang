<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the user's accounts.
     */
    public function index(Request $request)
    {
        $accounts = $request->user()->accounts()->get()->map(function ($account) {
            $income = $account->transactions()->where('type', 'pemasukan')->sum('amount');
            $expense = $account->transactions()->where('type', 'pengeluaran')->sum('amount');
            
            return [
                'id' => $account->id,
                'name' => $account->name,
                'initial_balance' => floatval($account->initial_balance),
                'balance' => floatval($account->balance),
                'is_visible' => boolval($account->is_visible),
                'income' => floatval($income),
                'expense' => floatval($expense),
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $accounts
        ]);
    }

    /**
     * Toggle the visibility of an account.
     */
    public function toggleVisibility(Request $request, $id)
    {
        $account = $request->user()->accounts()->findOrFail($id);
        
        $account->is_visible = !$account->is_visible;
        $account->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Visibilitas akun berhasil diperbarui.',
            'data' => [
                'id' => $account->id,
                'name' => $account->name,
                'is_visible' => boolval($account->is_visible),
            ]
        ]);
    }

    /**
     * Store a newly created account.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'initial_balance' => 'required|numeric|min:0',
        ]);

        $account = $request->user()->accounts()->create([
            'name' => $request->name,
            'initial_balance' => $request->initial_balance,
            'balance' => $request->initial_balance,
            'is_visible' => true,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Akun berhasil dibuat.',
            'data' => [
                'id' => $account->id,
                'name' => $account->name,
                'initial_balance' => floatval($account->initial_balance),
                'balance' => floatval($account->balance),
                'is_visible' => boolval($account->is_visible),
                'income' => 0.0,
                'expense' => 0.0,
            ]
        ], 201);
    }
}
