

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


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MOVIE_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MOVIE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMovieSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MOVIE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"short":"Unique identifier for the movie/series","type":"`$STRING`","index$":0},{"active":true,"name":"poster","req":false,"short":"URL to the poster image","type":"`$STRING`","index$":1},{"active":true,"format":"float","name":"rating","req":false,"short":"IMDb rating","type":"`$NUMBER`","index$":2},{"active":true,"name":"title","req":false,"short":"Title of the movie or series","type":"`$STRING`","index$":3},{"active":true,"name":"type","req":false,"short":"Type of content","type":"`$STRING`","index$":4},{"active":true,"name":"year","req":false,"short":"Release year","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":"The Matrix","kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /search","json":"{\"operationId\":\"searchMovies\",\"parameters\":[{\"description\":\"Search query for movie or series title\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"example\":\"The Matrix\",\"type\":\"string\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"page\":{\"description\":\"Current page number\",\"example\":1,\"type\":\"integer\"},\"results\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the movie/series\",\"example\":\"tt0133093\",\"type\":\"string\"},\"poster\":{\"description\":\"URL to the poster image\",\"example\":\"https://example.com/poster.jpg\",\"type\":\"string\"},\"rating\":{\"description\":\"IMDb rating\",\"example\":8.7,\"format\":\"float\",\"type\":\"number\"},\"title\":{\"description\":\"Title of the movie or series\",\"example\":\"The Matrix\",\"type\":\"string\"},\"type\":{\"description\":\"Type of content\",\"enum\":[\"movie\",\"series\",\"episode\"],\"example\":\"movie\",\"type\":\"string\"},\"year\":{\"description\":\"Release year\",\"example\":\"1999\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"example\":true,\"type\":\"boolean\"},\"total\":{\"description\":\"Total number of results found\",\"example\":150,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with search results\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"The query parameter 'q' is required\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - missing or invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"example\":\"The query parameter 'q' is required\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/search","segments":[{"lit":"search"}],"select":{"exist":["limit","page","q"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":1}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

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
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_MOVIE_TEST_SEARCH_ENTID': idmap,
    'FREE_MOVIE_TEST_LIVE': 'FALSE',
    'FREE_MOVIE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_MOVIE_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.FREE_MOVIE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_MOVIE_TEST_SEARCH_ENTID']
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
  
