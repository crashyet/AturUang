<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnalysisController extends Controller
{
    /**
     * Get analysis data filterable by month.
     */
    public function getAnalysis(Request $request)
    {
        $monthStr = $request->input('month'); // e.g., "Januari 2025" or "Januari 2026"
        
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;

        if ($monthStr) {
            $monthsMap = [
                'januari' => 1, 'februari' => 2, 'maret' => 3, 'april' => 4,
                'mei' => 5, 'juni' => 6, 'juli' => 7, 'agustus' => 8,
                'september' => 9, 'oktober' => 10, 'november' => 11, 'desember' => 12
            ];
            
            $parts = explode(' ', strtolower($monthStr));
            if (count($parts) === 2) {
                if (isset($monthsMap[$parts[0]])) {
                    $month = $monthsMap[$parts[0]];
                }
                $year = intval($parts[1]);
            }
        }

        $user = $request->user();

        // 1. Overall calculations
        $visibleAccounts = $user->accounts()->where('is_visible', true)->get();
        $overallBalance = $visibleAccounts->sum('balance');

        $overallTransactionsQuery = $user->transactions()
            ->whereMonth('date', $month)
            ->whereYear('date', $year);

        $overallTransactions = $overallTransactionsQuery->get();

        $overallIncome = $overallTransactions->where('type', 'pemasukan')->sum('amount');
        $overallExpense = $overallTransactions->where('type', 'pengeluaran')->sum('amount');

        $totalOverall = floatval($overallIncome + $overallExpense);
        $overallIncomePercent = $totalOverall > 0 ? round(($overallIncome / $totalOverall) * 100) : 0;
        $overallExpensePercent = $totalOverall > 0 ? round(($overallExpense / $totalOverall) * 100) : 0;

        // Top Pemasukan & Pengeluaran category
        $topOverallPemasukan = $this->getTopCategory($overallTransactionsQuery->clone()->where('type', 'pemasukan'));
        $topOverallPengeluaran = $this->getTopCategory($overallTransactionsQuery->clone()->where('type', 'pengeluaran'));

        $overallAnalysis = [
            'name' => 'Keseluruhan Akun',
            'total_amount' => floatval($overallIncome - $overallExpense),
            'pemasukan_percent' => intval($overallIncomePercent),
            'pengeluaran_percent' => intval($overallExpensePercent),
            'top_pemasukan' => $topOverallPemasukan,
            'top_pengeluaran' => $topOverallPengeluaran,
        ];

        // 2. Per Account calculations
        $accountsAnalysis = [];
        foreach ($visibleAccounts as $account) {
            $accountTransactionsQuery = $account->transactions()
                ->whereMonth('date', $month)
                ->whereYear('date', $year);

            $accountTransactions = $accountTransactionsQuery->get();

            $accountIncome = $accountTransactions->where('type', 'pemasukan')->sum('amount');
            $accountExpense = $accountTransactions->where('type', 'pengeluaran')->sum('amount');

            $totalAccount = floatval($accountIncome + $accountExpense);
            $accountIncomePercent = $totalAccount > 0 ? round(($accountIncome / $totalAccount) * 100) : 0;
            $accountExpensePercent = $totalAccount > 0 ? round(($accountExpense / $totalAccount) * 100) : 0;

            $topAccountPemasukan = $this->getTopCategory($accountTransactionsQuery->clone()->where('type', 'pemasukan'));
            $topAccountPengeluaran = $this->getTopCategory($accountTransactionsQuery->clone()->where('type', 'pengeluaran'));

            $accountsAnalysis[] = [
                'name' => $account->name,
                'total_amount' => floatval($accountIncome - $accountExpense),
                'pemasukan_percent' => intval($accountIncomePercent),
                'pengeluaran_percent' => intval($accountExpensePercent),
                'top_pemasukan' => $topAccountPemasukan,
                'top_pengeluaran' => $topAccountPengeluaran,
            ];
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'overall' => $overallAnalysis,
                'accounts' => $accountsAnalysis,
            ]
        ]);
    }

    /**
     * Helper to find the top transaction category/notes.
     */
    private function getTopCategory($query)
    {
        // Clone to calculate total sum before modifying the query
        $totalSum = (clone $query)->sum('amount');

        $top = (clone $query)->selectRaw('notes, sum(amount) as total_amount')
            ->groupBy('notes')
            ->orderBy('total_amount', 'desc')
            ->first();

        if (!$top) {
            return [
                'title' => 'Belum ada data',
                'percent' => 0,
                'amount' => 0,
            ];
        }

        $percent = $totalSum > 0 ? round(($top->total_amount / $totalSum) * 100) : 0;

        return [
            'title' => $top->notes ?: 'Lainnya',
            'percent' => intval($percent),
            'amount' => floatval($top->total_amount),
        ];
    }
}
