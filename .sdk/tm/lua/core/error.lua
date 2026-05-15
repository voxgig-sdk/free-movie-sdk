-- FreeMovie SDK error

local FreeMovieError = {}
FreeMovieError.__index = FreeMovieError


function FreeMovieError.new(code, msg, ctx)
  local self = setmetatable({}, FreeMovieError)
  self.is_sdk_error = true
  self.sdk = "FreeMovie"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FreeMovieError:error()
  return self.msg
end


function FreeMovieError:__tostring()
  return self.msg
end


return FreeMovieError
