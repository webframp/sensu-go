/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type CheckRow_check$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type CheckList_viewer$ref: FragmentReference;
export type CheckList_viewer = {|
  +checks: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +$fragmentRefs: CheckRow_check$ref,
      |},
      +cursor: string,
    |}>,
    +pageInfo: {|
      +hasNextPage: boolean,
    |},
  |},
  +$refType: CheckList_viewer$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "CheckList_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
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
                  "kind": "FragmentSpread",
                  "name": "CheckRow_check",
                  "args": null
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
};
(node/*: any*/).hash = '17814b0327137b446bb46276394dfb9a';
module.exports = node;
