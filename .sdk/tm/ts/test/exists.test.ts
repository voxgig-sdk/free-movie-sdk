
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeMovieSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FreeMovieSDK.test()
    equal(testsdk instanceof FreeMovieSDK, true,
      'FreeMovieSDK.test() must return a client synchronously')
  })

})
