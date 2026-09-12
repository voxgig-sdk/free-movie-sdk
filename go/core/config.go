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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "Comma-separated list of main actors",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "awards",
						"short": "Awards and nominations",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "boxOffice",
						"short": "Box office earnings",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country of origin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "director",
						"short": "Director name(s)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "genre",
						"short": "Comma-separated list of genres",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the movie/series",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"short": "Languages available",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "plot",
						"short": "Plot summary",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "poster",
						"short": "URL to the poster image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rated",
						"short": "Content rating",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "float",
						"name": "rating",
						"short": "IMDb rating",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "released",
						"short": "Release date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "runtime",
						"short": "Runtime duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the movie or series",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "votes",
						"short": "Number of votes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "writer",
						"short": "Writer name(s)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"short": "Release year",
						"type": "`$STRING`",
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "tt0133093",
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"movie",
									"{id}",
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
						"short": "Unique identifier for the movie/series",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "poster",
						"short": "URL to the poster image",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "float",
						"name": "rating",
						"short": "IMDb rating",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the movie or series",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"short": "Release year",
						"type": "`$STRING`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "The Matrix",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"search",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
