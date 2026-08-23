
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      }
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
              "parts": [
                "movie",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "short": "Unique identifier for the movie/series",
          "type": "`$STRING`"
        },
        {
          "name": "poster",
          "short": "URL to the poster image",
          "type": "`$STRING`"
        },
        {
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
              "parts": [
                "search"
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
  config
}

