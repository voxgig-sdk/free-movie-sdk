# Typed models for the FreeMovie SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Movie(TypedDict, total=False):
    actor: str
    award: str
    box_office: str
    country: str
    director: str
    genre: str
    id: str
    language: str
    plot: str
    poster: str
    rated: str
    rating: float
    released: str
    runtime: str
    title: str
    type: str
    vote: str
    writer: str
    year: str


class MovieLoadMatch(TypedDict):
    id: str


class Search(TypedDict, total=False):
    id: str
    poster: str
    rating: float
    title: str
    type: str
    year: str


class SearchListMatch(TypedDict, total=False):
    id: str
    poster: str
    rating: float
    title: str
    type: str
    year: str
