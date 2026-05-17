package voxgigfreemoviesdk

import (
	"github.com/voxgig-sdk/free-movie-sdk/go/core"
	"github.com/voxgig-sdk/free-movie-sdk/go/entity"
	"github.com/voxgig-sdk/free-movie-sdk/go/feature"
	_ "github.com/voxgig-sdk/free-movie-sdk/go/utility"
)

// Type aliases preserve external API.
type FreeMovieSDK = core.FreeMovieSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FreeMovieEntity = core.FreeMovieEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FreeMovieError = core.FreeMovieError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewMovieEntityFunc = func(client *core.FreeMovieSDK, entopts map[string]any) core.FreeMovieEntity {
		return entity.NewMovieEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.FreeMovieSDK, entopts map[string]any) core.FreeMovieEntity {
		return entity.NewSearchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFreeMovieSDK = core.NewFreeMovieSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
