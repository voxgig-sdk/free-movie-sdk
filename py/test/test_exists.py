# ProjectName SDK exists test

import pytest
from freemovie_sdk import FreeMovieSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FreeMovieSDK.test(None, None)
        assert testsdk is not None
