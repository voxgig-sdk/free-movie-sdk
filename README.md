# FreeMovie SDK

Look up movie and series details by title or IMDb ID, with no API key required

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Free Movie API

The Free Movie API (also referred to as **FM-DB**) is an unofficial, key-free RESTful service for looking up movie and series information, hosted at [imdb.iamidiotareyoutoo.com](https://imdb.iamidiotareyoutoo.com). It is community-maintained and is not affiliated with IMDb.com.

What you get from the API:

- Search by movie or series **title** (for example `Spiderman`).
- Look up a specific entry by **IMDb ID** (for example `tt0145487`).
- Structured details such as titles, genres, and descriptive metadata.

No authentication, API key, or signup is needed; both documented endpoints accept plain HTTPS GET requests and are reported as CORS-enabled, which makes them convenient to call directly from a browser. The community catalogue page for this API reports average response times in the 1,018–1,200 ms range and 100% uptime over the most recent 30-day window, though no formal rate limit is published, so be considerate when batching requests.

## Try it

**TypeScript**
```bash
npm install free-movie
```

**Python**
```bash
pip install free-movie-sdk
```

**PHP**
```bash
composer require voxgig/free-movie-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/free-movie-sdk/go
```

**Ruby**
```bash
gem install free-movie-sdk
```

**Lua**
```bash
luarocks install free-movie-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FreeMovieSDK } from 'free-movie'

const client = new FreeMovieSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o free-movie-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "free-movie": {
      "command": "/abs/path/to/free-movie-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Movie** | A film or series record sourced from the FM-DB dataset; individual entries can be retrieved by their IMDb ID (e.g. `tt0145487`). | `/movie/{id}` |
| **Search** | A query operation that returns matching movie or series records for a given title string (e.g. `Spiderman`). | `/search` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from freemovie_sdk import FreeMovieSDK

client = FreeMovieSDK({})


# Load a specific movie
movie, err = client.Movie(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'freemovie_sdk.php';

$client = new FreeMovieSDK([]);


// Load a specific movie
[$movie, $err] = $client->Movie(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/free-movie-sdk/go"

client := sdk.NewFreeMovieSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "FreeMovie_sdk"

client = FreeMovieSDK.new({})


# Load a specific movie
movie, err = client.Movie(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("free-movie_sdk")

local client = sdk.new({})


-- Load a specific movie
local movie, err = client:Movie(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FreeMovieSDK.test()
const result = await client.Movie().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FreeMovieSDK.test(None, None)
result, err = client.Movie(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FreeMovieSDK::test(null, null);
[$result, $err] = $client->Movie(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Movie(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FreeMovieSDK.test(nil, nil)
result, err = client.Movie(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Movie(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Free Movie API

- Upstream: [https://imdb.iamidiotareyoutoo.com](https://imdb.iamidiotareyoutoo.com)

- Project is published under the **GNU Affero General Public License v3.0**.
- The service is not endorsed by or affiliated with IMDb.com; the operators state "All content and images are contributed and maintained by our users."
- Under AGPL-3.0, if you modify the server and expose it over a network, you must make the modified source available to its users.
- Attribution to the upstream project is recommended whenever you redistribute or build on the data.

---

Generated from the Free Movie API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
