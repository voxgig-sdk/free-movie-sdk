# FreeMovie SDK exists test

require "minitest/autorun"
require_relative "../FreeMovie_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FreeMovieSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
