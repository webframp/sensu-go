/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type EventsListItem_event$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type EventsContainer_environment$ref: FragmentReference;
export type EventsContainer_environment = {|
  +checks: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +name: string,
      |},
    |}>,
  |},
  +entities: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +name: string,
      |},
    |}>,
  |},
  +events: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: EventsListItem_event$ref,
      |},
    |}>,
    +pageInfo: {|
      +hasNextPage: boolean,
    |},
  |},
  +$refType: EventsContainer_environment$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000,
    "type": "Int"
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "EventsContainer_environment",
  "type": "Environment",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "filter",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "order",
      "type": "EventsListOrder"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "checks",
      "storageKey": "checks(first:1000)",
      "args": v0,
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
              "selections": v1
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
      "args": v0,
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
              "selections": v1
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
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "EventsListItem_event",
                  "args": null
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
    }
  ]
};
})();
(node/*: any*/).hash = 'e7a6dc6e1b63e662b014ac1117e5db5b';
module.exports = node;
