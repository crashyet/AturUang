<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Account;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class TransactionController extends Controller
{
    /**
     * Display a listing of user transactions, with optional filtering.
     */
    public function index(Request $request)
    {
        $query = $request->user()->transactions()->with('account');

        // Search filter (notes or amount)
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('notes', 'like', "%{$search}%")
                  ->orWhere('amount', 'like', "%{$search}%");
            });
        }

        // Type filter (Pemasukan / Pengeluaran)
        if ($request->filled('type') && $request->input('type') !== 'Semua') {
            $type = strtolower($request->input('type'));
            if ($type === 'pemasukan' || $type === 'pengeluaran') {
                $query->where('type', $type);
            }
        }

        // Account filter
        if ($request->filled('account') && $request->input('account') !== 'Semua') {
            $accountName = $request->input('account');
            $query->whereHas('account', function ($q) use ($accountName) {
                $q->where('name', $accountName);
            });
        }

        // Date filter
        if ($request->filled('date_filter') && $request->input('date_filter') !== 'Semua') {
            $dateFilter = $request->input('date_filter');
            if ($dateFilter === 'Hari ini' || $dateFilter === 'today') {
                $query->whereDate('date', Carbon::today());
            } elseif ($dateFilter === 'Minggu ini' || $dateFilter === 'week') {
                $query->whereBetween('date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
            } elseif ($dateFilter === 'Bulan ini' || $dateFilter === 'month') {
                $query->whereMonth('date', Carbon::now()->month)->whereYear('date', Carbon::now()->year);
            }
        }

        $transactions = $query->orderBy('date', 'desc')
                            ->orderBy('created_at', 'desc')
                            ->get()
                            ->map(function ($t) {
                                return [
                                    'id' => $t->id,
                                    'account_name' => $t->account ? $t->account->name : 'N/A',
                                    'type' => $t->type,
                                    'amount' => floatval($t->amount),
                                    'source_of_funds' => $t->source_of_funds,
                                    'notes' => $t->notes,
                                    'date' => $t->date->format('Y-m-d'),
                                    'formatted_date' => $t->date->isoFormat('D MMMM YYYY'),
                                    'created_at' => $t->created_at,
                                ];
                            });

        return response()->json([
            'status' => 'success',
            'data' => $transactions
        ]);
    }

    /**
     * Store a newly created transaction in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:pemasukan,pengeluaran',
            'amount' => 'required|numeric|min:0.01',
            'account_name' => 'required|string',
            'source_of_funds' => 'required|string',
            'notes' => 'nullable|string',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors()
            ], 422);
        }

        $account = $request->user()->accounts()->where('name', $request->input('source_of_funds'))->first();

        if (!$account) {
            return response()->json([
                'status' => 'error',
                'message' => "Akun dengan nama '{$request->input('source_of_funds')}' tidak ditemukan."
            ], 404);
        }

        $transaction = Transaction::create([
            'user_id' => $request->user()->id,
            'account_id' => $account->id,
            'type' => $request->input('type'),
            'amount' => $request->input('amount'),
            'source_of_funds' => $request->input('account_name'),
            'notes' => $request->input('notes'),
            'date' => $request->input('date'),
        ]);

        // Create notification on database
        $formattedAmount = 'Rp' . number_format($transaction->amount, 0, ',', '.');
        $title = $transaction->type === 'pemasukan' ? 'Pemasukan Berhasil Dicatat' : 'Pengeluaran Berhasil Dicatat';
        $body = ($transaction->type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran') . " sebesar {$formattedAmount} telah berhasil dicatat ke {$account->name}.";

        Notification::create([
            'user_id' => $request->user()->id,
            'title' => $title,
            'body' => $body,
            'type' => $transaction->type,
            'is_read' => false,
        ]);

        // Refresh account details to get new balance
        $account->refresh();

        return response()->json([
            'status' => 'success',
            'message' => 'Transaksi berhasil dicatat.',
            'data' => [
                'transaction' => [
                    'id' => $transaction->id,
                    'account_name' => $account->name,
                    'type' => $transaction->type,
                    'amount' => floatval($transaction->amount),
                    'source_of_funds' => $transaction->source_of_funds,
                    'notes' => $transaction->notes,
                    'date' => $transaction->date->format('Y-m-d'),
                ],
                'account' => [
                    'id' => $account->id,
                    'name' => $account->name,
                    'balance' => floatval($account->balance),
                ]
            ]
        ], 201);
    }
}
