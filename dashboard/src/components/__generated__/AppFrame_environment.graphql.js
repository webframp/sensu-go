/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type AppBar_environment$ref = any;
type Drawer_environment$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type AppFrame_environment$ref: FragmentReference;
export type AppFrame_environment = {|
  +$fragmentRefs: (AppBar_environment$ref & Drawer_environment$ref),
  +$refType: AppFrame_environment$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "AppFrame_environment",
  "type": "Environment",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "AppBar_environment",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Drawer_environment",
      "args": null
    }
  ]
};
(node/*: any*/).hash = 'ccc41437fdb6bbc2404fe52d5a2b7ca0';
module.exports = node;
