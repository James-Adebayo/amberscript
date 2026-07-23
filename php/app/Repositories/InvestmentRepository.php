<?php

namespace App\Repositories;

class InvestmentRepository
{
    /**
     * Fetch standard annual or periodic interest rate.
     */
    public function getInterestRate(): float
    {
        return 0.05; // 5% default interest rate
    }

    /**
     * Get user investment balance.
     */
    public function getBalance(int $userId = 1): float
    {
        return 10000.00;
    }
}
