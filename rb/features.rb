# FreeMovie SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FreeMovieFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeMovieBaseFeature.new
    when "ratelimit"
      FreeMovieRatelimitFeature.new
    when "retry"
      FreeMovieRetryFeature.new
    when "test"
      FreeMovieTestFeature.new
    when "timeout"
      FreeMovieTimeoutFeature.new
    else
      FreeMovieBaseFeature.new
    end
  end
end
