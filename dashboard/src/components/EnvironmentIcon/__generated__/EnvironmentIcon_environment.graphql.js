/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
export type Icon = ('BRIEFCASE' | 'DONUT' | 'EMOTICON' | 'ESPRESSO' | 'EXPLORE' | 'FIRE' | 'HALFHEART' | 'HEART' | 'MUG' | 'POLYGON' | 'VISIBILITY' | '%future added value');
export type MutedColour = ('BLUE' | 'GRAY' | 'GREEN' | 'ORANGE' | 'PINK' | 'PURPLE' | 'YELLOW' | '%future added value');
import type { FragmentReference } from 'relay-runtime';
declare export opaque type EnvironmentIcon_environment$ref: FragmentReference;
export type EnvironmentIcon_environment = {|
  +colourId: MutedColour,
  +organization: {|
    +iconId: Icon,
  |},
  +$refType: EnvironmentIcon_environment$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "EnvironmentIcon_environment",
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
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "organization",
      "storageKey": null,
      "args": null,
      "concreteType": "Organization",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "iconId",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node/*: any*/).hash = '3e86772724fdaca9fb8b897c20124402';
module.exports = node;
