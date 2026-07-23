<?php

namespace App\Routes;

use App\Container;
use Exception;

class Web
{
    private Container $container;
    private array $routes = [];

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function get(string $path, array $handler): void
    {
        $this->routes['GET'][$path] = $handler;
    }

    public function post(string $path, array $handler): void
    {
        $this->routes['POST'][$path] = $handler;
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = parse_url($uri, PHP_URL_PATH) ?? '/';

        if (isset($this->routes[$method][$path])) {
            [$controllerClass, $action] = $this->routes[$method][$path];
            $controller = $this->container->get($controllerClass);
            $controller->$action();
            return;
        }

        // Default fallback route for calculate if no path specified
        if ($path === '/' || $path === '/index.php') {
            $controller = $this->container->get(\App\Controllers\InvestmentController::class);
            $controller->calculate();
            return;
        }

        http_response_code(404);
        echo json_encode(["error" => "Route not found: [$method] $path"]);
    }
}
