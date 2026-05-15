<?php
declare(strict_types=1);

// FreeMovie SDK exists test

require_once __DIR__ . '/../freemovie_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FreeMovieSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
