"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "movie",
        "accessor": "Movie",
        "op": "load",
        "method": "GET",
        "path": "/movie/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "tt0133093"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "tt0133093",
            "title": "The Matrix",
            "year": "1999",
            "rated": "R",
            "released": "31 Mar 1999",
            "runtime": "136 min",
            "genre": "Action, Sci-Fi",
            "director": "Lana Wachowski, Lilly Wachowski",
            "writer": "Lana Wachowski, Lilly Wachowski",
            "actors": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
            "plot": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
            "language": "English",
            "country": "USA",
            "awards": "Won 4 Oscars. Another 37 wins & 51 nominations.",
            "poster": "https://example.com/poster.jpg",
            "rating": 8.7,
            "votes": "1,500,000",
            "type": "movie",
            "boxOffice": "$171,479,930"
        },
        "idField": "id"
    },
    {
        "entity": "search",
        "accessor": "Search",
        "op": "list",
        "method": "GET",
        "path": "/search",
        "args": [],
        "select": {
            "limit": "v1",
            "page": "v1",
            "q": "The Matrix"
        },
        "headers": [],
        "query": [
            "q",
            "page",
            "limit"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "success": true,
            "results": [
                {
                    "id": "tt0133093",
                    "poster": "https://example.com/poster.jpg",
                    "rating": 8.7,
                    "title": "The Matrix",
                    "type": "movie",
                    "year": "1999"
                }
            ],
            "total": 150,
            "page": 1
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map