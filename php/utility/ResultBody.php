<?php
declare(strict_types=1);

// FreeMovie SDK utility: result_body

class FreeMovieResultBody
{
    public static function call(FreeMovieContext $ctx): ?FreeMovieResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
