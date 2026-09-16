package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewMovieEntityFunc func(client *FreeMovieSDK, entopts map[string]any) FreeMovieEntity

var NewSearchEntityFunc func(client *FreeMovieSDK, entopts map[string]any) FreeMovieEntity

