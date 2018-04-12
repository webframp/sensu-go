/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
export type MutedColour = ('BLUE' | 'GRAY' | 'GREEN' | 'ORANGE' | 'PINK' | 'PURPLE' | 'YELLOW' | '%future added value');
import type { FragmentReference } from 'relay-runtime';
declare export opaque type EnvironmentSymbol_environment$ref: FragmentReference;
export type EnvironmentSymbol_environment = {|
  +colourId: MutedColour,
  +$refType: EnvironmentSymbol_environment$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "EnvironmentSymbol_environment",
  "type": "Environment",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "colourId",
      "args": null,
      "storageKey": null
    }
  ]
};
(node/*: any*/).hash = '2f920967a7b2e29a268d9c1716849a86';
module.exports = node;
