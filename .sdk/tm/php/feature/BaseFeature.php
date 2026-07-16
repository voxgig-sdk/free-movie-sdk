<?php
declare(strict_types=1);

// FreeMovie SDK base feature

class FreeMovieBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FreeMovieContext $ctx, array $options): void {}
    public function PostConstruct(FreeMovieContext $ctx): void {}
    public function PostConstructEntity(FreeMovieContext $ctx): void {}
    public function SetData(FreeMovieContext $ctx): void {}
    public function GetData(FreeMovieContext $ctx): void {}
    public function GetMatch(FreeMovieContext $ctx): void {}
    public function SetMatch(FreeMovieContext $ctx): void {}
    public function PrePoint(FreeMovieContext $ctx): void {}
    public function PreSpec(FreeMovieContext $ctx): void {}
    public function PreRequest(FreeMovieContext $ctx): void {}
    public function PreResponse(FreeMovieContext $ctx): void {}
    public function PreResult(FreeMovieContext $ctx): void {}
    public function PreDone(FreeMovieContext $ctx): void {}
    public function PreUnexpected(FreeMovieContext $ctx): void {}
}
