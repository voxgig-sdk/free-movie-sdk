<?php
declare(strict_types=1);

// FreeMovie SDK utility: feature_add

class FreeMovieFeatureAdd
{
    public static function call(FreeMovieContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
