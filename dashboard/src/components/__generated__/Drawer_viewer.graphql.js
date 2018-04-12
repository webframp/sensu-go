/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type NamespaceSelector_viewer$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type Drawer_viewer$ref: FragmentReference;
export type Drawer_viewer = {|
  +$fragmentRefs: NamespaceSelector_viewer$ref,
  +$refType: Drawer_viewer$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Drawer_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "NamespaceSelector_viewer",
      "args": null
    }
  ]
};
(node/*: any*/).hash = 'fcd43fcd42cd879751307e8b9f276122';
module.exports = node;
