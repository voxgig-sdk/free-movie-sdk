

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeMovieSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('MovieEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MOVIE_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MOVIE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMovieSDK.test()
    const ent = testsdk.Movie()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FreeMovieSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Movie().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MOVIE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'movie.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actors":{"a":true,"h":"Actors","n":"actors","r":false,"sh":"Comma-separated list of main actors","t":"`$STRING`","key$":"actors","index$":0},"awards":{"a":true,"h":"Awards","n":"awards","r":false,"sh":"Awards and nominations","t":"`$STRING`","key$":"awards","index$":1},"boxOffice":{"a":true,"h":"Box Office","n":"boxOffice","r":false,"sh":"Box office earnings","t":"`$STRING`","key$":"boxOffice","index$":2},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country of origin","t":"`$STRING`","key$":"country","index$":3},"director":{"a":true,"h":"Director","n":"director","r":false,"sh":"Director name(s)","t":"`$STRING`","key$":"director","index$":4},"genre":{"a":true,"h":"Genre","n":"genre","r":false,"sh":"Comma-separated list of genres","t":"`$STRING`","key$":"genre","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the movie/series","t":"`$STRING`","key$":"id","index$":6},"language":{"a":true,"h":"Language","n":"language","r":false,"sh":"Languages available","t":"`$STRING`","key$":"language","index$":7},"plot":{"a":true,"h":"Plot","n":"plot","r":false,"sh":"Plot summary","t":"`$STRING`","key$":"plot","index$":8},"poster":{"a":true,"h":"Poster","n":"poster","r":false,"sh":"URL to the poster image","t":"`$STRING`","key$":"poster","index$":9},"rated":{"a":true,"h":"Rated","n":"rated","r":false,"sh":"Content rating","t":"`$STRING`","key$":"rated","index$":10},"rating":{"a":true,"fo":"float","h":"Rating","n":"rating","r":false,"sh":"IMDb rating","t":"`$NUMBER`","key$":"rating","index$":11},"released":{"a":true,"h":"Released","n":"released","r":false,"sh":"Release date","t":"`$STRING`","key$":"released","index$":12},"runtime":{"a":true,"h":"Runtime","n":"runtime","r":false,"sh":"Runtime duration","t":"`$STRING`","key$":"runtime","index$":13},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the movie or series","t":"`$STRING`","key$":"title","index$":14},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of content","t":"`$STRING`","key$":"type","index$":15},"votes":{"a":true,"h":"Votes","n":"votes","r":false,"sh":"Number of votes","t":"`$STRING`","key$":"votes","index$":16},"writer":{"a":true,"h":"Writer","n":"writer","r":false,"sh":"Writer name(s)","t":"`$STRING`","key$":"writer","index$":17},"year":{"a":true,"h":"Year","n":"year","r":false,"sh":"Release year","t":"`$STRING`","key$":"year","index$":18}},"id":{"field":"id","name":"id"},"name":"movie","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /movie/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"tt0133093","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/movie/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"movie"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"movie","name__orig":"movie","Name":"Movie","name_":"movie","name-":"movie","NAME":"MOVIE","index$":0}, {"active":true,"entity":"movie","key$":"BasicMovieFlow","kind":"basic","name":"BasicMovieFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"movie_ref01","srcdatavar":"movie_ref01_data","suffix":"_dt0"},"m":{"id":"movie01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-movie_ref01"}}],"index$":0}]}, 'Movie', {"GET /movie/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"IMDb ID or unique identifier of the movie/series","required":true,"schema":{"type":"string","example":"tt0133093"},"index$":0}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
