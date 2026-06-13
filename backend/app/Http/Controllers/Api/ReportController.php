<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Account;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Get report data with filtering and grouping.
     */
    public function getReport(Request $request)
    {
        $monthStr = $request->input('month'); // e.g. "Januari 2025"
        $sumberDana = $request->input('sumber_dana', 'Semua'); // "Tunai", "BNI", "BRI", "Bank Mandiri", or "Semua"
        $period = $request->input('period', 'Harian'); // "Harian", "Mingguan", or "Bulanan"

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

        $query = $request->user()->transactions()
            ->whereMonth('date', $month)
            ->whereYear('date', $year);

        // Filter by Account (Sumber Dana)
        if ($sumberDana !== 'Semua') {
            $query->whereHas('account', function ($q) use ($sumberDana) {
                $q->where('name', $sumberDana);
            });
        }

        $transactions = $query->get();

        // Calculate Totals
        $totalPemasukan = $transactions->where('type', 'pemasukan')->sum('amount');
        $totalPengeluaran = $transactions->where('type', 'pengeluaran')->sum('amount');
        $totalKeuntungan = $totalPemasukan - $totalPengeluaran;

        // Grouping Breakdown
        $breakdown = [];

        if ($period === 'Harian') {
            // Group by date
            $grouped = $transactions->groupBy(function($t) {
                return $t->date->format('Y-m-d');
            });

            foreach ($grouped as $date => $items) {
                $income = $items->where('type', 'pemasukan')->sum('amount');
                $expense = $items->where('type', 'pengeluaran')->sum('amount');
                
                $breakdown[] = [
                    'label' => Carbon::parse($date)->isoFormat('D MMM YYYY'),
                    'pemasukan' => floatval($income),
                    'pengeluaran' => floatval($expense),
                    'keuntungan' => floatval($income - $expense),
                ];
            }
        } elseif ($period === 'Mingguan') {
            // Group by week of the month
            $grouped = $transactions->groupBy(function($t) {
                $weekNumber = intval(ceil($t->date->day / 7));
                return "Minggu " . ($weekNumber > 4 ? 4 : $weekNumber);
            });

            // Make sure we sort from Minggu 1 to Minggu 4
            $keys = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
            foreach ($keys as $key) {
                $items = $grouped->get($key, collect());
                $income = $items->where('type', 'pemasukan')->sum('amount');
                $expense = $items->where('type', 'pengeluaran')->sum('amount');
                
                $breakdown[] = [
                    'label' => $key,
                    'pemasukan' => floatval($income),
                    'pengeluaran' => floatval($expense),
                    'keuntungan' => floatval($income - $expense),
                ];
            }
        } else {
            // Group by month
            $income = $transactions->where('type', 'pemasukan')->sum('amount');
            $expense = $transactions->where('type', 'pengeluaran')->sum('amount');
            
            $breakdown[] = [
                'label' => Carbon::create()->month($month)->isoFormat('MMMM YYYY'),
                'pemasukan' => floatval($income),
                'pengeluaran' => floatval($expense),
                'keuntungan' => floatval($income - $expense),
            ];
        }

        // Sort breakdown by label/date if daily
        if ($period === 'Harian') {
            usort($breakdown, function($a, $b) {
                return strcmp($b['label'], $a['label']); // Descending
            });
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'totals' => [
                    'pemasukan' => floatval($totalPemasukan),
                    'pengeluaran' => floatval($totalPengeluaran),
                    'keuntungan' => floatval($totalKeuntungan),
                ],
                'breakdown' => $breakdown,
            ]
        ]);
    }
}
