<?php

namespace App;

use ReflectionClass;
use ReflectionParameter;
use Exception;

class Container
{
    private array $instances = [];
    private array $bindings = [];

    /**
     * Bind a service resolver or instance to the container.
     */
    public function bind(string $abstract, callable|string|null $concrete = null, bool $shared = false): void
    {
        if ($concrete === null) {
            $concrete = $abstract;
        }

        $this->bindings[$abstract] = [
            'concrete' => $concrete,
            'shared' => $shared,
        ];
    }

    /**
     * Bind a singleton instance.
     */
    public function singleton(string $abstract, callable|string|null $concrete = null): void
    {
        $this->bind($abstract, $concrete, true);
    }

    /**
     * Resolve a service or class instance with auto-wiring via Reflection.
     */
    public function get(string $abstract)
    {
        if (isset($this->instances[$abstract])) {
            return $this->instances[$abstract];
        }

        $concrete = $this->bindings[$abstract]['concrete'] ?? $abstract;

        if ($concrete instanceof \Closure || is_callable($concrete)) {
            $object = $concrete($this);
        } else {
            $object = $this->build($concrete);
        }

        if (isset($this->bindings[$abstract]['shared']) && $this->bindings[$abstract]['shared']) {
            $this->instances[$abstract] = $object;
        }

        return $object;
    }

    /**
     * Check if a binding or instance exists.
     */
    public function has(string $abstract): bool
    {
        return isset($this->bindings[$abstract]) || isset($this->instances[$abstract]) || class_exists($abstract);
    }

    /**
     * Auto-wire class dependencies using reflection.
     */
    private function build(string $concrete): object
    {
        if (!class_exists($concrete)) {
            throw new Exception("Target class [$concrete] does not exist.");
        }

        $reflector = new ReflectionClass($concrete);

        if (!$reflector->isInstantiable()) {
            throw new Exception("Class [$concrete] is not instantiable.");
        }

        $constructor = $reflector->getConstructor();

        if (is_null($constructor)) {
            return new $concrete();
        }

        $parameters = $constructor->getParameters();
        $dependencies = array_map(function (ReflectionParameter $parameter) use ($concrete) {
            $type = $parameter->getType();

            if (!$type || $type->isBuiltin()) {
                if ($parameter->isDefaultValueAvailable()) {
                    return $parameter->getDefaultValue();
                }
                throw new Exception("Cannot resolve un-typed parameter \${$parameter->getName()} in class [$concrete]");
            }

            return $this->get($type->getName());
        }, $parameters);

        return $reflector->newInstanceArgs($dependencies);
    }
}
