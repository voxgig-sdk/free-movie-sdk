# frozen_string_literal: true

# Typed models for the FreeMovie SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Movie entity data model.
#
# @!attribute [rw] actor
#   @return [String, nil]
#
# @!attribute [rw] award
#   @return [String, nil]
#
# @!attribute [rw] box_office
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] director
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] plot
#   @return [String, nil]
#
# @!attribute [rw] poster
#   @return [String, nil]
#
# @!attribute [rw] rated
#   @return [String, nil]
#
# @!attribute [rw] rating
#   @return [Float, nil]
#
# @!attribute [rw] released
#   @return [String, nil]
#
# @!attribute [rw] runtime
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] vote
#   @return [String, nil]
#
# @!attribute [rw] writer
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [String, nil]
Movie = Struct.new(
  :actor,
  :award,
  :box_office,
  :country,
  :director,
  :genre,
  :id,
  :language,
  :plot,
  :poster,
  :rated,
  :rating,
  :released,
  :runtime,
  :title,
  :type,
  :vote,
  :writer,
  :year,
  keyword_init: true
)

# Request payload for Movie#load.
#
# @!attribute [rw] id
#   @return [String]
MovieLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] poster
#   @return [String, nil]
#
# @!attribute [rw] rating
#   @return [Float, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [String, nil]
Search = Struct.new(
  :id,
  :poster,
  :rating,
  :title,
  :type,
  :year,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] poster
#   @return [String, nil]
#
# @!attribute [rw] rating
#   @return [Float, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [String, nil]
SearchListMatch = Struct.new(
  :id,
  :poster,
  :rating,
  :title,
  :type,
  :year,
  keyword_init: true
)

