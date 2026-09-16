"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'FreeMovie',
        slug: "free-movie",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://imdb.iamidiotareyoutoo.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            movie: {},
            search: {},
        }
    };
    entity = {
        "movie": {
            "fields": [
                {
                    "name": "actors",
                    "short": "Comma-separated list of main actors",
                    "type": "`$STRING`"
                },
                {
                    "name": "awards",
                    "short": "Awards and nominations",
                    "type": "`$STRING`"
                },
                {
                    "name": "boxOffice",
                    "short": "Box office earnings",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "short": "Country of origin",
                    "type": "`$STRING`"
                },
                {
                    "name": "director",
                    "short": "Director name(s)",
                    "type": "`$STRING`"
                },
                {
                    "name": "genre",
                    "short": "Comma-separated list of genres",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the movie/series",
                    "type": "`$STRING`"
                },
                {
                    "name": "language",
                    "short": "Languages available",
                    "type": "`$STRING`"
                },
                {
                    "name": "plot",
                    "short": "Plot summary",
                    "type": "`$STRING`"
                },
                {
                    "name": "poster",
                    "short": "URL to the poster image",
                    "type": "`$STRING`"
                },
                {
                    "name": "rated",
                    "short": "Content rating",
                    "type": "`$STRING`"
                },
                {
                    "format": "float",
                    "name": "rating",
                    "short": "IMDb rating",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "released",
                    "short": "Release date",
                    "type": "`$STRING`"
                },
                {
                    "name": "runtime",
                    "short": "Runtime duration",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "short": "Title of the movie or series",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "short": "Type of content",
                    "type": "`$STRING`"
                },
                {
                    "name": "votes",
                    "short": "Number of votes",
                    "type": "`$STRING`"
                },
                {
                    "name": "writer",
                    "short": "Writer name(s)",
                    "type": "`$STRING`"
                },
                {
                    "name": "year",
                    "short": "Release year",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "movie",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "tt0133093",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/movie/{id}",
                            "segments": [
                                {
                                    "lit": "movie"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "movie",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "search": {
            "fields": [
                {
                    "name": "id",
                    "short": "Unique identifier for the movie/series",
                    "type": "`$STRING`"
                },
                {
                    "name": "poster",
                    "short": "URL to the poster image",
                    "type": "`$STRING`"
                },
                {
                    "format": "float",
                    "name": "rating",
                    "short": "IMDb rating",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "title",
                    "short": "Title of the movie or series",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "short": "Type of content",
                    "type": "`$STRING`"
                },
                {
                    "name": "year",
                    "short": "Release year",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "search",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "The Matrix",
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search",
                            "segments": [
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "page",
                                    "q"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map