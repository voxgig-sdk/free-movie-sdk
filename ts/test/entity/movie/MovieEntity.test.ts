

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeMovieSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('MovieEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MOVIE_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MOVIE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMovieSDK.test()
    const ent = testsdk.Movie()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MOVIE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'movie.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"actors","req":false,"short":"Comma-separated list of main actors","type":"`$STRING`","index$":0},{"active":true,"name":"awards","req":false,"short":"Awards and nominations","type":"`$STRING`","index$":1},{"active":true,"name":"boxOffice","req":false,"short":"Box office earnings","type":"`$STRING`","index$":2},{"active":true,"name":"country","req":false,"short":"Country of origin","type":"`$STRING`","index$":3},{"active":true,"name":"director","req":false,"short":"Director name(s)","type":"`$STRING`","index$":4},{"active":true,"name":"genre","req":false,"short":"Comma-separated list of genres","type":"`$STRING`","index$":5},{"active":true,"name":"id","req":false,"short":"Unique identifier for the movie/series","type":"`$STRING`","index$":6},{"active":true,"name":"language","req":false,"short":"Languages available","type":"`$STRING`","index$":7},{"active":true,"name":"plot","req":false,"short":"Plot summary","type":"`$STRING`","index$":8},{"active":true,"name":"poster","req":false,"short":"URL to the poster image","type":"`$STRING`","index$":9},{"active":true,"name":"rated","req":false,"short":"Content rating","type":"`$STRING`","index$":10},{"active":true,"format":"float","name":"rating","req":false,"short":"IMDb rating","type":"`$NUMBER`","index$":11},{"active":true,"name":"released","req":false,"short":"Release date","type":"`$STRING`","index$":12},{"active":true,"name":"runtime","req":false,"short":"Runtime duration","type":"`$STRING`","index$":13},{"active":true,"name":"title","req":false,"short":"Title of the movie or series","type":"`$STRING`","index$":14},{"active":true,"name":"type","req":false,"short":"Type of content","type":"`$STRING`","index$":15},{"active":true,"name":"votes","req":false,"short":"Number of votes","type":"`$STRING`","index$":16},{"active":true,"name":"writer","req":false,"short":"Writer name(s)","type":"`$STRING`","index$":17},{"active":true,"name":"year","req":false,"short":"Release year","type":"`$STRING`","index$":18}],"id":{"field":"id","name":"id"},"name":"movie","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"tt0133093","kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /movie/{id}","json":"{\"operationId\":\"getMovieById\",\"parameters\":[{\"description\":\"IMDb ID or unique identifier of the movie/series\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":\"tt0133093\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"actors\":{\"description\":\"Comma-separated list of main actors\",\"example\":\"Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss\",\"type\":\"string\"},\"awards\":{\"description\":\"Awards and nominations\",\"example\":\"Won 4 Oscars. Another 37 wins & 51 nominations.\",\"type\":\"string\"},\"boxOffice\":{\"description\":\"Box office earnings\",\"example\":\"$171,479,930\",\"type\":\"string\"},\"country\":{\"description\":\"Country of origin\",\"example\":\"USA\",\"type\":\"string\"},\"director\":{\"description\":\"Director name(s)\",\"example\":\"Lana Wachowski, Lilly Wachowski\",\"type\":\"string\"},\"genre\":{\"description\":\"Comma-separated list of genres\",\"example\":\"Action, Sci-Fi\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the movie/series\",\"example\":\"tt0133093\",\"type\":\"string\"},\"language\":{\"description\":\"Languages available\",\"example\":\"English\",\"type\":\"string\"},\"plot\":{\"description\":\"Plot summary\",\"example\":\"A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.\",\"type\":\"string\"},\"poster\":{\"description\":\"URL to the poster image\",\"example\":\"https://example.com/poster.jpg\",\"type\":\"string\"},\"rated\":{\"description\":\"Content rating\",\"example\":\"R\",\"type\":\"string\"},\"rating\":{\"description\":\"IMDb rating\",\"example\":8.7,\"format\":\"float\",\"type\":\"number\"},\"released\":{\"description\":\"Release date\",\"example\":\"31 Mar 1999\",\"type\":\"string\"},\"runtime\":{\"description\":\"Runtime duration\",\"example\":\"136 min\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the movie or series\",\"example\":\"The Matrix\",\"type\":\"string\"},\"type\":{\"description\":\"Type of content\",\"enum\":[\"movie\",\"series\",\"episode\"],\"example\":\"movie\",\"type\":\"string\"},\"votes\":{\"description\":\"Number of votes\",\"example\":\"1,500,000\",\"type\":\"string\"},\"writer\":{\"description\":\"Writer name(s)\",\"example\":\"Lana Wachowski, Lilly Wachowski\",\"type\":\"string\"},\"year\":{\"description\":\"Release year\",\"example\":\"1999\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with movie details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"The query parameter 'q' is required\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Movie not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"The query parameter 'q' is required\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/movie/{id}","segments":[{"lit":"movie"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"movie","name__orig":"movie","Name":"Movie","name_":"movie","name-":"movie","NAME":"MOVIE","index$":0}, {"active":true,"entity":"movie","key$":"BasicMovieFlow","kind":"basic","name":"BasicMovieFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"movie_ref01","srcdatavar":"movie_ref01_data","suffix":"_dt0"},"match":{"id":"movie01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-movie_ref01"}}],"index$":0}]}, 'Movie')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let movie_ref01_data = Object.values(setup.data.existing.movie)[0] as any

    // LOAD
    const movie_ref01_ent = client.Movie()
    const movie_ref01_match_dt0: any = {}
    movie_ref01_match_dt0.id = movie_ref01_data.id
    const movie_ref01_data_dt0 = (await movie_ref01_ent.load(movie_ref01_match_dt0)).data()
    assert(movie_ref01_data_dt0.id === movie_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/movie/MovieTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FreeMovieSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['movie01','movie02','movie03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_MOVIE_TEST_MOVIE_ENTID': idmap,
    'FREE_MOVIE_TEST_LIVE': 'FALSE',
    'FREE_MOVIE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_MOVIE_TEST_MOVIE_ENTID']

  const live = 'TRUE' === env.FREE_MOVIE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_MOVIE_TEST_MOVIE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FreeMovieSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FREE_MOVIE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
