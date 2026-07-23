<?php

namespace App\Controllers;

use App\Services\InvestmentService;

class InvestmentController
{
    private InvestmentService $investmentService;

    public function __construct(InvestmentService $investmentService)
    {
        $this->investmentService = $investmentService;
    }

    public function calculate(): void
    {
        $balance = 10000;

        $interest = $this->investmentService->calculateInterest($balance);

        header('Content-Type: application/json');
        echo json_encode([
            "balance" => $balance,
            "investment" => $interest
        ]);
    }
}