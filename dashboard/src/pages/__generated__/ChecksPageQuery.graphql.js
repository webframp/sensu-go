/**
 * @flow
 * @relayHash 50e4a55c3d93d2fe4ff277c1c89fa4ec
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CheckList_viewer$ref = any;
export type ChecksPageQueryVariables = {| |};
export type ChecksPageQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: CheckList_viewer$ref,
  |},
|};
*/


/*
query ChecksPageQuery {
  viewer {
    ...CheckList_viewer
  }
}

fragment CheckList_viewer on Viewer {
  checks(first: 1500) {
    edges {
      node {
        ...CheckRow_check
        id
      }
      cursor
    }
    pageInfo {
      hasNextPage
    }
  }
}

fragment CheckRow_check on CheckConfig {
  name
  command
  subscriptions
  interval
  namespace {
    organization
    environment
  }
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "operationKind": "query",
  "name": "ChecksPageQuery",
  "id": null,
  "text": "query ChecksPageQuery {\n  viewer {\n    ...CheckList_viewer\n  }\n}\n\nfragment CheckList_viewer on Viewer {\n  checks(first: 1500) {\n    edges {\n      node {\n        ...CheckRow_check\n        id\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment CheckRow_check on CheckConfig {\n  name\n  command\n  subscriptions\n  interval\n  namespace {\n    organization\n    environment\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ChecksPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "__viewer_viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CheckList_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ChecksPageQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checks",
            "storageKey": "checks(first:1500)",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1500,
                "type": "Int"
              }
            ],
            "concreteType": "CheckConfigConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "CheckConfigEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CheckConfig",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "name",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "command",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "subscriptions",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "interval",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "namespace",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Namespace",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "organization",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "environment",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "viewer",
        "args": null,
        "handle": "viewer",
        "key": "",
        "filters": null
      }
    ]
  }
};
(node/*: any*/).hash = '13ab9d2c293e048def88ec81af4f95b3';
module.exports = node;
