# FreeMovie SDK feature factory

from freemovie_sdk.feature.base_feature import FreeMovieBaseFeature
from freemovie_sdk.feature.test_feature import FreeMovieTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FreeMovieBaseFeature(),
        "test": lambda: FreeMovieTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
