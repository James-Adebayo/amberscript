<?php
namespace App\Controller;
use App\Services\InvestmentService;


class InvestmentController
{
    private InvestmentService $investmentServices;

    public function __construct()
    {
        $this->investmentService = new InvestmentService();
    }

    public function calculate()
    {
        $balance = 10000;

        $interest = $this->investmentServices->calculateInterest($balance);

        echo json_encode([
            "investment" => $interest
        ]);
    }
}