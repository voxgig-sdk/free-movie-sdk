<?php
declare(strict_types=1);

// FreeMovie SDK utility: feature_hook

class FreeMovieFeatureHook
{
    public static function call(FreeMovieContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
