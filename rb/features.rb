# FreeMovie SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FreeMovieFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeMovieBaseFeature.new
    when "test"
      FreeMovieTestFeature.new
    else
      FreeMovieBaseFeature.new
    end
  end
end
