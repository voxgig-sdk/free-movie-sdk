-- Typed models for the FreeMovie SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Movie
---@field actor? string
---@field award? string
---@field box_office? string
---@field country? string
---@field director? string
---@field genre? string
---@field id? string
---@field language? string
---@field plot? string
---@field poster? string
---@field rated? string
---@field rating? number
---@field released? string
---@field runtime? string
---@field title? string
---@field type? string
---@field vote? string
---@field writer? string
---@field year? string

---@class MovieLoadMatch
---@field id string

---@class Search
---@field id? string
---@field poster? string
---@field rating? number
---@field title? string
---@field type? string
---@field year? string

---@class SearchListMatch
---@field id? string
---@field poster? string
---@field rating? number
---@field title? string
---@field type? string
---@field year? string

local M = {}

return M
