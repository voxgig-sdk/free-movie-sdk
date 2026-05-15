package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewMovieEntityFunc func(client *FreeMovieSDK, entopts map[string]any) FreeMovieEntity

var NewSearchEntityFunc func(client *FreeMovieSDK, entopts map[string]any) FreeMovieEntity

