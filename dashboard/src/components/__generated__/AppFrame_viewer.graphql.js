/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type Drawer_viewer$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type AppFrame_viewer$ref: FragmentReference;
export type AppFrame_viewer = {|
  +$fragmentRefs: Drawer_viewer$ref,
  +$refType: AppFrame_viewer$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "AppFrame_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Drawer_viewer",
      "args": null
    }
  ]
};
(node/*: any*/).hash = '9273b2cd03bda50d52d6801977dd1cab';
module.exports = node;
