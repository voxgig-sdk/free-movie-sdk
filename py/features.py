# FreeMovie SDK feature factory

from feature.base_feature import FreeMovieBaseFeature
from feature.test_feature import FreeMovieTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FreeMovieBaseFeature(),
        "test": lambda: FreeMovieTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
