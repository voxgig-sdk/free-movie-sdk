# FreeMovie SDK utility: feature_add
module FreeMovieUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
