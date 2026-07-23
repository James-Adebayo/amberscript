<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Container;
use App\Routes\Web;
use App\Controllers\InvestmentController;
use App\Services\InvestmentService;
use App\Repositories\InvestmentRepository;

// 1. Initialize Container
$container = new Container();

// 2. Register Singleton/Service Bindings
$container->singleton(InvestmentRepository::class);
$container->singleton(InvestmentService::class);
$container->bind(InvestmentController::class);

// 3. Register Routes
$router = new Web($container);
$router->get('/calculate', [InvestmentController::class, 'calculate']);
$router->get('/', [InvestmentController::class, 'calculate']);

// 4. Dispatch Request
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';

$router->dispatch($method, $uri);
