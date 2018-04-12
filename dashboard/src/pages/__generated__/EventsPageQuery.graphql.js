/**
 * @flow
 * @relayHash 774129622f98c7a3bfc94239f13c8f28
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type EventsContainer_environment$ref = any;
export type EventsListOrder = ('NEWEST' | 'OLDEST' | 'SEVERITY' | '%future added value');
export type EventsPageQueryVariables = {|
  filter?: ?string,
  order?: ?EventsListOrder,
  environment: string,
  organization: string,
|};
export type EventsPageQueryResponse = {|
  +environment: ?{|
    +$fragmentRefs: EventsContainer_environment$ref,
  |},
|};
*/


/*
query EventsPageQuery(
  $filter: String = "HasCheck && IsIncident"
  $order: EventsListOrder = SEVERITY
  $environment: String!
  $organization: String!
) {
  environment(organization: $organization, environment: $environment) {
    ...EventsContainer_environment
    id
  }
}

fragment EventsContainer_environment on Environment {
  checks(first: 1000) {
    edges {
      node {
        name
        id
      }
    }
  }
  entities(first: 1000) {
    edges {
      node {
        name
        id
      }
    }
  }
  events(first: 100, filter: $filter, orderBy: $order) {
    edges {
      node {
        id
        ...EventsListItem_event
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}

fragment EventsListItem_event on Event {
  id
  timestamp
  check {
    status
    name
    output
  }
  entity {
    name
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "filter",
    "type": "String",
    "defaultValue": "HasCheck && IsIncident"
  },
  {
    "kind": "LocalArgument",
    "name": "order",
    "type": "EventsListOrder",
    "defaultValue": "SEVERITY"
  },
  {
    "kind": "LocalArgument",
    "name": "environment",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "organization",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "environment",
    "variableName": "environment",
    "type": "String!"
  },
  {
    "kind": "Variable",
    "name": "organization",
    "variableName": "organization",
    "type": "String!"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000,
    "type": "Int"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = [
  v3,
  v4
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "EventsPageQuery",
  "id": null,
  "text": "query EventsPageQuery(\n  $filter: String = \"HasCheck && IsIncident\"\n  $order: EventsListOrder = SEVERITY\n  $environment: String!\n  $organization: String!\n) {\n  environment(organization: $organization, environment: $environment) {\n    ...EventsContainer_environment\n    id\n  }\n}\n\nfragment EventsContainer_environment on Environment {\n  checks(first: 1000) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n  entities(first: 1000) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n  events(first: 100, filter: $filter, orderBy: $order) {\n    edges {\n      node {\n        id\n        ...EventsListItem_event\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment EventsListItem_event on Event {\n  id\n  timestamp\n  check {\n    status\n    name\n    output\n  }\n  entity {\n    name\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EventsPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "environment",
        "storageKey": null,
        "args": v1,
        "concreteType": "Environment",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "EventsContainer_environment",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EventsPageQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "environment",
        "storageKey": null,
        "args": v1,
        "concreteType": "Environment",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checks",
            "storageKey": "checks(first:1000)",
            "args": v2,
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
                    "selections": v5
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "entities",
            "storageKey": "entities(first:1000)",
            "args": v2,
            "concreteType": "EntityConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "EntityEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Entity",
                    "plural": false,
                    "selections": v5
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "events",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "filter",
                "variableName": "filter",
                "type": "String"
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 100,
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "orderBy",
                "variableName": "order",
                "type": "EventsListOrder"
              }
            ],
            "concreteType": "EventConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "EventEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Event",
                    "plural": false,
                    "selections": [
                      v4,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "timestamp",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "check",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Check",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "status",
                            "args": null,
                            "storageKey": null
                          },
                          v3,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "output",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "entity",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Entity",
                        "plural": false,
                        "selections": v5
                      }
                    ]
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
          },
          v4
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '73150a1a9e44c83b776b96d2f8188679';
module.exports = node;
