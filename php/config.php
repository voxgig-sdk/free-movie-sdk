<?php
declare(strict_types=1);

// FreeMovie SDK configuration

class FreeMovieConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FreeMovie",
                "slug" => "free-movie",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://imdb.iamidiotareyoutoo.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "movie" => [],
                    "search" => [],
                ],
            ],
            "entity" => [
        'movie' => [
          'fields' => [
            [
              'name' => 'actors',
              'short' => 'Comma-separated list of main actors',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'awards',
              'short' => 'Awards and nominations',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'boxOffice',
              'short' => 'Box office earnings',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'short' => 'Country of origin',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'director',
              'short' => 'Director name(s)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'genre',
              'short' => 'Comma-separated list of genres',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the movie/series',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'language',
              'short' => 'Languages available',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'plot',
              'short' => 'Plot summary',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'poster',
              'short' => 'URL to the poster image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rated',
              'short' => 'Content rating',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'float',
              'name' => 'rating',
              'short' => 'IMDb rating',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'released',
              'short' => 'Release date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'runtime',
              'short' => 'Runtime duration',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Title of the movie or series',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Type of content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'votes',
              'short' => 'Number of votes',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'writer',
              'short' => 'Writer name(s)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'year',
              'short' => 'Release year',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'movie',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'tt0133093',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/movie/{id}',
                  'segments' => [
                    [
                      'lit' => 'movie',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'movie',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'id',
              'short' => 'Unique identifier for the movie/series',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'poster',
              'short' => 'URL to the poster image',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'float',
              'name' => 'rating',
              'short' => 'IMDb rating',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'title',
              'short' => 'Title of the movie or series',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Type of content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'year',
              'short' => 'Release year',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'The Matrix',
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'segments' => [
                    [
                      'lit' => 'search',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                      'q',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'parts' => [
                    'search',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FreeMovieFeatures::make_feature($name);
    }
}
