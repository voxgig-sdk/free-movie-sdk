// Typed models for the FreeMovie SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Movie {
  actor?: string
  award?: string
  box_office?: string
  country?: string
  director?: string
  genre?: string
  id?: string
  language?: string
  plot?: string
  poster?: string
  rated?: string
  rating?: number
  released?: string
  runtime?: string
  title?: string
  type?: string
  vote?: string
  writer?: string
  year?: string
}

export interface MovieLoadMatch {
  id: string
}

export interface Search {
  id?: string
  poster?: string
  rating?: number
  title?: string
  type?: string
  year?: string
}

export type SearchListMatch = Partial<Search>

