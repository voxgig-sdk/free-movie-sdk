# FreeMovie SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FreeMovie",
            "slug": "free-movie",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://imdb.iamidiotareyoutoo.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "movie": {},
                "search": {},
            },
        },
        "entity": {
      "movie": {
        "fields": [
          {
            "name": "actors",
            "title": "Actors",
            "type": "`$STRING`",
            "short": "Comma-separated list of main actors",
          },
          {
            "name": "awards",
            "title": "Awards",
            "type": "`$STRING`",
            "short": "Awards and nominations",
          },
          {
            "name": "boxOffice",
            "title": "Box Office",
            "type": "`$STRING`",
            "short": "Box office earnings",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "short": "Country of origin",
          },
          {
            "name": "director",
            "title": "Director",
            "type": "`$STRING`",
            "short": "Director name(s)",
          },
          {
            "name": "genre",
            "title": "Genre",
            "type": "`$STRING`",
            "short": "Comma-separated list of genres",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the movie/series",
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
            "short": "Languages available",
          },
          {
            "name": "plot",
            "title": "Plot",
            "type": "`$STRING`",
            "short": "Plot summary",
          },
          {
            "name": "poster",
            "title": "Poster",
            "type": "`$STRING`",
            "short": "URL to the poster image",
          },
          {
            "name": "rated",
            "title": "Rated",
            "type": "`$STRING`",
            "short": "Content rating",
          },
          {
            "name": "rating",
            "title": "Rating",
            "type": "`$NUMBER`",
            "short": "IMDb rating",
            "format": "float",
          },
          {
            "name": "released",
            "title": "Released",
            "type": "`$STRING`",
            "short": "Release date",
          },
          {
            "name": "runtime",
            "title": "Runtime",
            "type": "`$STRING`",
            "short": "Runtime duration",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Title of the movie or series",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Type of content",
          },
          {
            "name": "votes",
            "title": "Votes",
            "type": "`$STRING`",
            "short": "Number of votes",
          },
          {
            "name": "writer",
            "title": "Writer",
            "type": "`$STRING`",
            "short": "Writer name(s)",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$STRING`",
            "short": "Release year",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "movie",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/movie/{id}",
                "segments": [
                  {
                    "lit": "movie",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "movie",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "tt0133093",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the movie/series",
          },
          {
            "name": "poster",
            "title": "Poster",
            "type": "`$STRING`",
            "short": "URL to the poster image",
          },
          {
            "name": "rating",
            "title": "Rating",
            "type": "`$NUMBER`",
            "short": "IMDb rating",
            "format": "float",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Title of the movie or series",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Type of content",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$STRING`",
            "short": "Release year",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "search",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "segments": [
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "The Matrix",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "page",
                    "q",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
