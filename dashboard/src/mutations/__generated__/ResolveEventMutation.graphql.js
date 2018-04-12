/**
 * @flow
 * @relayHash cb9c96e52cdbae185c3143f1a4dbf8f3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ResolveEventMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    id: string,
    source?: ?string,
  },
|};
export type ResolveEventMutationResponse = {|
  +resolveEvent: ?{|
    +event: {|
      +timestamp: any,
      +check: ?{|
        +status: number,
        +output: string,
      |},
    |},
  |},
|};
*/


/*
mutation ResolveEventMutation(
  $input: ResolveEventInput!
) {
  resolveEvent(input: $input) {
    event {
      timestamp
      check {
        status
        output
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ResolveEventInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "ResolveEventInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "timestamp",
  "args": null,
  "storageKey": null
},
v3 = {
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
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "output",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "ResolveEventMutation",
  "id": null,
  "text": "mutation ResolveEventMutation(\n  $input: ResolveEventInput!\n) {\n  resolveEvent(input: $input) {\n    event {\n      timestamp\n      check {\n        status\n        output\n      }\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ResolveEventMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "resolveEvent",
        "storageKey": null,
        "args": v1,
        "concreteType": "ResolveEventPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "event",
            "storageKey": null,
            "args": null,
            "concreteType": "Event",
            "plural": false,
            "selections": [
              v2,
              v3
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ResolveEventMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "resolveEvent",
        "storageKey": null,
        "args": v1,
        "concreteType": "ResolveEventPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "event",
            "storageKey": null,
            "args": null,
            "concreteType": "Event",
            "plural": false,
            "selections": [
              v2,
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '1f42eeeae35650dbfa191f984701f1a4';
module.exports = node;
