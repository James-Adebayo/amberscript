<?php
namespace Services;

class InvestmentService
{
    public function calculateInterest(float $balance): float
    {
        $rate = 0.01;

        return $balance * $rate;
    }
}