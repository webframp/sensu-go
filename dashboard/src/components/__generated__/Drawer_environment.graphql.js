/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type EnvironmentIcon_environment$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type Drawer_environment$ref: FragmentReference;
export type Drawer_environment = {|
  +$fragmentRefs: EnvironmentIcon_environment$ref,
  +$refType: Drawer_environment$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Drawer_environment",
  "type": "Environment",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "EnvironmentIcon_environment",
      "args": null
    }
  ]
};
(node/*: any*/).hash = '33fc29442da9272bd9a2e438b79a23ae';
module.exports = node;
