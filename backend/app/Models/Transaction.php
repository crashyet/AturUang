<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'account_id',
        'type',
        'amount',
        'source_of_funds',
        'notes',
        'date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
    ];

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::created(function (Transaction $transaction) {
            $account = $transaction->account;
            if ($account) {
                if ($transaction->type === 'pemasukan') {
                    $account->balance += $transaction->amount;
                } elseif ($transaction->type === 'pengeluaran') {
                    $account->balance -= $transaction->amount;
                }
                $account->save();
            }
        });

        static::deleted(function (Transaction $transaction) {
            $account = $transaction->account;
            if ($account) {
                if ($transaction->type === 'pemasukan') {
                    $account->balance -= $transaction->amount;
                } elseif ($transaction->type === 'pengeluaran') {
                    $account->balance += $transaction->amount;
                }
                $account->save();
            }
        });
    }

    /**
     * Get the user that logged the transaction.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the account associated with the transaction.
     */
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
