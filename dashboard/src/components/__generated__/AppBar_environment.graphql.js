/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type EnvironmentLabel_environment$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type AppBar_environment$ref: FragmentReference;
export type AppBar_environment = {|
  +$fragmentRefs: EnvironmentLabel_environment$ref,
  +$refType: AppBar_environment$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "AppBar_environment",
  "type": "Environment",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "EnvironmentLabel_environment",
      "args": null
    }
  ]
};
(node/*: any*/).hash = '29a9f10ca6e7ed2d9da353e18f81c7f2';
module.exports = node;
