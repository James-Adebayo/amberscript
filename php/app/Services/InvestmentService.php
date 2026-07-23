<?php

namespace App\Services;

use App\Repositories\InvestmentRepository;

class InvestmentService
{
    private InvestmentRepository $investmentRepository;

    public function __construct(InvestmentRepository $investmentRepository)
    {
        $this->investmentRepository = $investmentRepository;
    }

    public function calculateInterest(?float $balance = null): float
    {
        if ($balance === null) {
            $balance = $this->investmentRepository->getBalance();
        }

        $rate = $this->investmentRepository->getInterestRate();

        return $balance * $rate;
    }
}