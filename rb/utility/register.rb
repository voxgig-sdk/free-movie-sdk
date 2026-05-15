# FreeMovie SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FreeMovieUtility.registrar = ->(u) {
  u.clean = FreeMovieUtilities::Clean
  u.done = FreeMovieUtilities::Done
  u.make_error = FreeMovieUtilities::MakeError
  u.feature_add = FreeMovieUtilities::FeatureAdd
  u.feature_hook = FreeMovieUtilities::FeatureHook
  u.feature_init = FreeMovieUtilities::FeatureInit
  u.fetcher = FreeMovieUtilities::Fetcher
  u.make_fetch_def = FreeMovieUtilities::MakeFetchDef
  u.make_context = FreeMovieUtilities::MakeContext
  u.make_options = FreeMovieUtilities::MakeOptions
  u.make_request = FreeMovieUtilities::MakeRequest
  u.make_response = FreeMovieUtilities::MakeResponse
  u.make_result = FreeMovieUtilities::MakeResult
  u.make_point = FreeMovieUtilities::MakePoint
  u.make_spec = FreeMovieUtilities::MakeSpec
  u.make_url = FreeMovieUtilities::MakeUrl
  u.param = FreeMovieUtilities::Param
  u.prepare_auth = FreeMovieUtilities::PrepareAuth
  u.prepare_body = FreeMovieUtilities::PrepareBody
  u.prepare_headers = FreeMovieUtilities::PrepareHeaders
  u.prepare_method = FreeMovieUtilities::PrepareMethod
  u.prepare_params = FreeMovieUtilities::PrepareParams
  u.prepare_path = FreeMovieUtilities::PreparePath
  u.prepare_query = FreeMovieUtilities::PrepareQuery
  u.result_basic = FreeMovieUtilities::ResultBasic
  u.result_body = FreeMovieUtilities::ResultBody
  u.result_headers = FreeMovieUtilities::ResultHeaders
  u.transform_request = FreeMovieUtilities::TransformRequest
  u.transform_response = FreeMovieUtilities::TransformResponse
}
