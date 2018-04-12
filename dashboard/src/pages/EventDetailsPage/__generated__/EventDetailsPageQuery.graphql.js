/**
 * @flow
 * @relayHash 52c153dea82ff947147ec371c31a7e63
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EventDetailsPageQueryVariables = {|
  ns: {
    environment?: ?string,
    organization: string,
  },
  check: string,
  entity: string,
|};
export type EventDetailsPageQueryResponse = {|
  +event: ?{|
    +id: string,
    +timestamp: any,
  |},
|};
*/


/*
query EventDetailsPageQuery(
  $ns: NamespaceInput!
  $check: String!
  $entity: String!
) {
  event(ns: $ns, entity: $entity, check: $check) {
    id
    timestamp
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "ns",
    "type": "NamespaceInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "check",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "entity",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "event",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "check",
        "variableName": "check",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "entity",
        "variableName": "entity",
        "type": "String!"
      },
      {
        "kind": "Variable",
        "name": "ns",
        "variableName": "ns",
        "type": "NamespaceInput!"
      }
    ],
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
        "kind": "ScalarField",
        "alias": null,
        "name": "timestamp",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "EventDetailsPageQuery",
  "id": null,
  "text": "query EventDetailsPageQuery(\n  $ns: NamespaceInput!\n  $check: String!\n  $entity: String!\n) {\n  event(ns: $ns, entity: $entity, check: $check) {\n    id\n    timestamp\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EventDetailsPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "EventDetailsPageQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '2bb330f3938b661da537f296edb5ead2';
module.exports = node;
