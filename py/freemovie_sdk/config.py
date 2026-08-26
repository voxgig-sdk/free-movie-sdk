# FreeMovie SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Comma-separated list of main actors",
            "type": "`$STRING`",
          },
          {
            "name": "awards",
            "short": "Awards and nominations",
            "type": "`$STRING`",
          },
          {
            "name": "boxOffice",
            "short": "Box office earnings",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "short": "Country of origin",
            "type": "`$STRING`",
          },
          {
            "name": "director",
            "short": "Director name(s)",
            "type": "`$STRING`",
          },
          {
            "name": "genre",
            "short": "Comma-separated list of genres",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the movie/series",
            "type": "`$STRING`",
          },
          {
            "name": "language",
            "short": "Languages available",
            "type": "`$STRING`",
          },
          {
            "name": "plot",
            "short": "Plot summary",
            "type": "`$STRING`",
          },
          {
            "name": "poster",
            "short": "URL to the poster image",
            "type": "`$STRING`",
          },
          {
            "name": "rated",
            "short": "Content rating",
            "type": "`$STRING`",
          },
          {
            "name": "rating",
            "short": "IMDb rating",
            "type": "`$NUMBER`",
          },
          {
            "name": "released",
            "short": "Release date",
            "type": "`$STRING`",
          },
          {
            "name": "runtime",
            "short": "Runtime duration",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the movie or series",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Type of content",
            "type": "`$STRING`",
          },
          {
            "name": "votes",
            "short": "Number of votes",
            "type": "`$STRING`",
          },
          {
            "name": "writer",
            "short": "Writer name(s)",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "short": "Release year",
            "type": "`$STRING`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/movie/{id}",
                "parts": [
                  "movie",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "short": "Unique identifier for the movie/series",
            "type": "`$STRING`",
          },
          {
            "name": "poster",
            "short": "URL to the poster image",
            "type": "`$STRING`",
          },
          {
            "name": "rating",
            "short": "IMDb rating",
            "type": "`$NUMBER`",
          },
          {
            "name": "title",
            "short": "Title of the movie or series",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Type of content",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "short": "Release year",
            "type": "`$STRING`",
          },
        ],
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
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "The Matrix",
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "parts": [
                  "search",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "page",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
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
