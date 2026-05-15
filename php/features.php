<?php
declare(strict_types=1);

// FreeMovie SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FreeMovieFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FreeMovieBaseFeature();
            case "test":
                return new FreeMovieTestFeature();
            default:
                return new FreeMovieBaseFeature();
        }
    }
}
