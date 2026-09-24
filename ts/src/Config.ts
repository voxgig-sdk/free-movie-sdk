
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FreeMovie',
        slug: "free-movie",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://imdb.iamidiotareyoutoo.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        movie: {
        },
  
        search: {
        },
  
    }
  }


  entity = {
    "movie": {
      "fields": [
        {
          "name": "actors",
          "title": "Actors",
          "type": "`$STRING`",
          "short": "Comma-separated list of main actors"
        },
        {
          "name": "awards",
          "title": "Awards",
          "type": "`$STRING`",
          "short": "Awards and nominations"
        },
        {
          "name": "boxOffice",
          "title": "Box Office",
          "type": "`$STRING`",
          "short": "Box office earnings"
        },
        {
          "name": "country",
          "title": "Country",
          "type": "`$STRING`",
          "short": "Country of origin"
        },
        {
          "name": "director",
          "title": "Director",
          "type": "`$STRING`",
          "short": "Director name(s)"
        },
        {
          "name": "genre",
          "title": "Genre",
          "type": "`$STRING`",
          "short": "Comma-separated list of genres"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the movie/series"
        },
        {
          "name": "language",
          "title": "Language",
          "type": "`$STRING`",
          "short": "Languages available"
        },
        {
          "name": "plot",
          "title": "Plot",
          "type": "`$STRING`",
          "short": "Plot summary"
        },
        {
          "name": "poster",
          "title": "Poster",
          "type": "`$STRING`",
          "short": "URL to the poster image"
        },
        {
          "name": "rated",
          "title": "Rated",
          "type": "`$STRING`",
          "short": "Content rating"
        },
        {
          "name": "rating",
          "title": "Rating",
          "type": "`$NUMBER`",
          "short": "IMDb rating",
          "format": "float"
        },
        {
          "name": "released",
          "title": "Released",
          "type": "`$STRING`",
          "short": "Release date"
        },
        {
          "name": "runtime",
          "title": "Runtime",
          "type": "`$STRING`",
          "short": "Runtime duration"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Title of the movie or series"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Type of content"
        },
        {
          "name": "votes",
          "title": "Votes",
          "type": "`$STRING`",
          "short": "Number of votes"
        },
        {
          "name": "writer",
          "title": "Writer",
          "type": "`$STRING`",
          "short": "Writer name(s)"
        },
        {
          "name": "year",
          "title": "Year",
          "type": "`$STRING`",
          "short": "Release year"
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
              "parts": [
                "movie",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "tt0133093"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
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
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the movie/series"
        },
        {
          "name": "poster",
          "title": "Poster",
          "type": "`$STRING`",
          "short": "URL to the poster image"
        },
        {
          "name": "rating",
          "title": "Rating",
          "type": "`$NUMBER`",
          "short": "IMDb rating",
          "format": "float"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Title of the movie or series"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Type of content"
        },
        {
          "name": "year",
          "title": "Year",
          "type": "`$STRING`",
          "short": "Release year"
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
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "segments": [
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 10
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "The Matrix"
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "page",
                  "q"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

