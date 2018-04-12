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
declare export opaque type EnvironmentLabel_environment$ref: FragmentReference;
export type EnvironmentLabel_environment = {|
  +name: string,
  +colourId: MutedColour,
  +organization: {|
    +name: string,
    +iconId: Icon,
  |},
  +$refType: EnvironmentLabel_environment$ref,
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
  "name": "EnvironmentLabel_environment",
  "type": "Environment",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
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
        v0,
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
})();
(node/*: any*/).hash = 'c8a353631268f2b7ff98f4f20c3da45a';
module.exports = node;
