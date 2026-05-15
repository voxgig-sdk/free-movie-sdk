# FreeMovie SDK utility: make_context
require_relative '../core/context'
module FreeMovieUtilities
  MakeContext = ->(ctxmap, basectx) {
    FreeMovieContext.new(ctxmap, basectx)
  }
end
