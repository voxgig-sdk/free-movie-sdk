<?php
declare(strict_types=1);

// FreeMovie SDK utility: result_headers

class FreeMovieResultHeaders
{
    public static function call(FreeMovieContext $ctx): ?FreeMovieResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
