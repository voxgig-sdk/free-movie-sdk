<?php
declare(strict_types=1);

// Typed models for the FreeMovie SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Movie entity data model. */
class Movie
{
    public ?string $actor = null;
    public ?string $award = null;
    public ?string $box_office = null;
    public ?string $country = null;
    public ?string $director = null;
    public ?string $genre = null;
    public ?string $id = null;
    public ?string $language = null;
    public ?string $plot = null;
    public ?string $poster = null;
    public ?string $rated = null;
    public ?float $rating = null;
    public ?string $released = null;
    public ?string $runtime = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $vote = null;
    public ?string $writer = null;
    public ?string $year = null;
}

/** Request payload for Movie#load. */
class MovieLoadMatch
{
    public string $id;
}

/** Search entity data model. */
class Search
{
    public ?string $id = null;
    public ?string $poster = null;
    public ?float $rating = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $year = null;
}

/** Match filter for Search#list (any subset of Search fields). */
class SearchListMatch
{
    public ?string $id = null;
    public ?string $poster = null;
    public ?float $rating = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $year = null;
}

