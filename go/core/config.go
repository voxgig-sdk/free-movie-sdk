package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FreeMovie",
			"slug": "free-movie",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://imdb.iamidiotareyoutoo.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"movie": map[string]any{},
				"search": map[string]any{},
			},
		},
		"entity": map[string]any{
			"movie": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "actors",
						"title": "Actors",
						"type": "`$STRING`",
						"short": "Comma-separated list of main actors",
					},
					map[string]any{
						"name": "awards",
						"title": "Awards",
						"type": "`$STRING`",
						"short": "Awards and nominations",
					},
					map[string]any{
						"name": "boxOffice",
						"title": "Box Office",
						"type": "`$STRING`",
						"short": "Box office earnings",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "Country of origin",
					},
					map[string]any{
						"name": "director",
						"title": "Director",
						"type": "`$STRING`",
						"short": "Director name(s)",
					},
					map[string]any{
						"name": "genre",
						"title": "Genre",
						"type": "`$STRING`",
						"short": "Comma-separated list of genres",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the movie/series",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
						"short": "Languages available",
					},
					map[string]any{
						"name": "plot",
						"title": "Plot",
						"type": "`$STRING`",
						"short": "Plot summary",
					},
					map[string]any{
						"name": "poster",
						"title": "Poster",
						"type": "`$STRING`",
						"short": "URL to the poster image",
					},
					map[string]any{
						"name": "rated",
						"title": "Rated",
						"type": "`$STRING`",
						"short": "Content rating",
					},
					map[string]any{
						"name": "rating",
						"title": "Rating",
						"type": "`$NUMBER`",
						"short": "IMDb rating",
						"format": "float",
					},
					map[string]any{
						"name": "released",
						"title": "Released",
						"type": "`$STRING`",
						"short": "Release date",
					},
					map[string]any{
						"name": "runtime",
						"title": "Runtime",
						"type": "`$STRING`",
						"short": "Runtime duration",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Title of the movie or series",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Type of content",
					},
					map[string]any{
						"name": "votes",
						"title": "Votes",
						"type": "`$STRING`",
						"short": "Number of votes",
					},
					map[string]any{
						"name": "writer",
						"title": "Writer",
						"type": "`$STRING`",
						"short": "Writer name(s)",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$STRING`",
						"short": "Release year",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "movie",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/movie/{id}",
								"segments": []any{
									map[string]any{
										"lit": "movie",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"movie",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "tt0133093",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the movie/series",
					},
					map[string]any{
						"name": "poster",
						"title": "Poster",
						"type": "`$STRING`",
						"short": "URL to the poster image",
					},
					map[string]any{
						"name": "rating",
						"title": "Rating",
						"type": "`$NUMBER`",
						"short": "IMDb rating",
						"format": "float",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Title of the movie or series",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Type of content",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$STRING`",
						"short": "Release year",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "The Matrix",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
										"q",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
