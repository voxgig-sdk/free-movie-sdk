# FreeMovie SDK feature factory

from freemovie_sdk.feature.base_feature import FreeMovieBaseFeature
from freemovie_sdk.feature.ratelimit_feature import FreeMovieRatelimitFeature
from freemovie_sdk.feature.retry_feature import FreeMovieRetryFeature
from freemovie_sdk.feature.test_feature import FreeMovieTestFeature
from freemovie_sdk.feature.timeout_feature import FreeMovieTimeoutFeature


_FEATURES = {
    "base": lambda: FreeMovieBaseFeature(),
    "ratelimit": lambda: FreeMovieRatelimitFeature(),
    "retry": lambda: FreeMovieRetryFeature(),
    "test": lambda: FreeMovieTestFeature(),
    "timeout": lambda: FreeMovieTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
