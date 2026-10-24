# FreeMovie SDK utility: prepare_body
require_relative 'media'
module FreeMovieUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FreeMovieUtilities.raw_body(ctx.reqdata) if FreeMovieUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
