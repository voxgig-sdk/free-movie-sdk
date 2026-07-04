# Typed models for the FreeMovie SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Movie:
    actor: Optional[str] = None
    award: Optional[str] = None
    box_office: Optional[str] = None
    country: Optional[str] = None
    director: Optional[str] = None
    genre: Optional[str] = None
    id: Optional[str] = None
    language: Optional[str] = None
    plot: Optional[str] = None
    poster: Optional[str] = None
    rated: Optional[str] = None
    rating: Optional[float] = None
    released: Optional[str] = None
    runtime: Optional[str] = None
    title: Optional[str] = None
    type: Optional[str] = None
    vote: Optional[str] = None
    writer: Optional[str] = None
    year: Optional[str] = None


@dataclass
class MovieLoadMatch:
    id: str


@dataclass
class Search:
    id: Optional[str] = None
    poster: Optional[str] = None
    rating: Optional[float] = None
    title: Optional[str] = None
    type: Optional[str] = None
    year: Optional[str] = None


@dataclass
class SearchListMatch:
    id: Optional[str] = None
    poster: Optional[str] = None
    rating: Optional[float] = None
    title: Optional[str] = None
    type: Optional[str] = None
    year: Optional[str] = None

