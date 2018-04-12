/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
export type Icon = ('BRIEFCASE' | 'DONUT' | 'EMOTICON' | 'ESPRESSO' | 'EXPLORE' | 'FIRE' | 'HALFHEART' | 'HEART' | 'MUG' | 'POLYGON' | 'VISIBILITY' | '%future added value');
import type { FragmentReference } from 'relay-runtime';
declare export opaque type OrganizationIcon_organization$ref: FragmentReference;
export type OrganizationIcon_organization = {|
  +iconId: Icon,
  +$refType: OrganizationIcon_organization$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "OrganizationIcon_organization",
  "type": "Organization",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "iconId",
      "args": null,
      "storageKey": null
    }
  ]
};
(node/*: any*/).hash = '8d7e3c4f28f4754ea54ddf89711916ca';
module.exports = node;
