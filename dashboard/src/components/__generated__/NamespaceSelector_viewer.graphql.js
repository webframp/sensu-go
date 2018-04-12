/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type NamespaceSelectorMenu_viewer$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type NamespaceSelector_viewer$ref: FragmentReference;
export type NamespaceSelector_viewer = {|
  +$fragmentRefs: NamespaceSelectorMenu_viewer$ref,
  +$refType: NamespaceSelector_viewer$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "NamespaceSelector_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "NamespaceSelectorMenu_viewer",
      "args": null
    }
  ]
};
(node/*: any*/).hash = 'd42eb462e770ff49e2689147aa6b7fdf';
module.exports = node;
