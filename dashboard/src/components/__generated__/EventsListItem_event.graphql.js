/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type EventsListItem_event$ref: FragmentReference;
export type EventsListItem_event = {|
  +id: string,
  +timestamp: any,
  +check: ?{|
    +status: number,
    +name: string,
    +output: string,
  |},
  +entity: ?{|
    +name: string,
  |},
  +$refType: EventsListItem_event$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "EventsListItem_event",
  "type": "Event",
  "metadata": null,
  "argumentDefinitions": [],
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
        v0,
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
      "selections": [
        v0
      ]
    }
  ]
};
})();
(node/*: any*/).hash = 'e30458114a8084eccdd0bf30f60acca1';
module.exports = node;
