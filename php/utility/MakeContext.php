<?php
declare(strict_types=1);

// FreeMovie SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FreeMovieMakeContext
{
    public static function call(array $ctxmap, ?FreeMovieContext $basectx): FreeMovieContext
    {
        return new FreeMovieContext($ctxmap, $basectx);
    }
}
