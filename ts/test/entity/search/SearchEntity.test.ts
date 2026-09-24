

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the movie/series","t":"`$STRING`","key$":"id","index$":0},"poster":{"a":true,"h":"Poster","n":"poster","r":false,"sh":"URL to the poster image","t":"`$STRING`","key$":"poster","index$":1},"rating":{"a":true,"fo":"float","h":"Rating","n":"rating","r":false,"sh":"IMDb rating","t":"`$NUMBER`","key$":"rating","index$":2},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the movie or series","t":"`$STRING`","key$":"title","index$":3},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of content","t":"`$STRING`","key$":"type","index$":4},"year":{"a":true,"h":"Year","n":"year","r":false,"sh":"Release year","t":"`$STRING`","key$":"year","index$":5}},"id":{"field":"id","name":"id"},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"The Matrix","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/search","q":{"exist":["limit","page","q"]},"r":{},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":1}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search', {"GET /search":{"protocol":"http","operationId":"searchMovies","responses":{"200":{"description":"Successful response with search results","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"results":{"items":{"properties":{"id":{"description":"Unique identifier for the movie/series","example":"tt0133093","type":"string","key$":"id"},"poster":{"description":"URL to the poster image","example":"https://example.com/poster.jpg","type":"string","key$":"poster"},"rating":{"description":"IMDb rating","example":8.7,"format":"float","type":"number","key$":"rating"},"title":{"description":"Title of the movie or series","example":"The Matrix","type":"string","key$":"title"},"type":{"description":"Type of content","enum":["movie","series","episode"],"example":"movie","type":"string","key$":"type"},"year":{"description":"Release year","example":"1999","type":"string","key$":"year"}},"type":"object","x-ref":"#/components/schemas/MovieResult","index$":0},"key$":"results","type":"array"},"total":{"description":"Total number of results found","example":150,"key$":"total","type":"integer"},"page":{"description":"Current page number","example":1,"key$":"page","type":"integer"}}}}}},"400":{"description":"Bad request - missing or invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"message":{"type":"string","description":"Detailed error description","example":"The query parameter 'q' is required"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"message":{"type":"string","description":"Detailed error description","example":"The query parameter 'q' is required"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"q","in":"query","description":"Search query for movie or series title","required":true,"schema":{"type":"string","example":"The Matrix"},"index$":0},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":1},{"name":"limit","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":10,"minimum":1,"maximum":100},"index$":2}],"securitySource":"unspecified"}})
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
  
