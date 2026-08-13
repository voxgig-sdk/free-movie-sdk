# FreeMovie SDK utility: make_context

from projectname_sdk.core.context import FreeMovieContext


def make_context_util(ctxmap, basectx):
    return FreeMovieContext(ctxmap, basectx)
