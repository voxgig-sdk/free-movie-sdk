<?php
declare(strict_types=1);

// FreeMovie SDK utility: prepare_body

class FreeMoviePrepareBody
{
    public static function call(FreeMovieContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
