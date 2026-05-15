# FreeMovie SDK utility: make_context

from core.context import FreeMovieContext


def make_context_util(ctxmap, basectx):
    return FreeMovieContext(ctxmap, basectx)
