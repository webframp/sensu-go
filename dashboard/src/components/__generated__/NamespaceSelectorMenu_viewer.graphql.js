/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type EnvironmentSymbol_environment$ref = any;
type OrganizationIcon_organization$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type NamespaceSelectorMenu_viewer$ref: FragmentReference;
export type NamespaceSelectorMenu_viewer = {|
  +organizations: $ReadOnlyArray<{|
    +name: string,
    +environments: $ReadOnlyArray<{|
      +name: string,
      +$fragmentRefs: EnvironmentSymbol_environment$ref,
    |}>,
    +$fragmentRefs: OrganizationIcon_organization$ref,
  |}>,
  +$refType: NamespaceSelectorMenu_viewer$ref,
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
  "name": "NamespaceSelectorMenu_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "organizations",
      "storageKey": null,
      "args": null,
      "concreteType": "Organization",
      "plural": true,
      "selections": [
        v0,
        {
          "kind": "FragmentSpread",
          "name": "OrganizationIcon_organization",
          "args": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "environments",
          "storageKey": null,
          "args": null,
          "concreteType": "Environment",
          "plural": true,
          "selections": [
            v0,
            {
              "kind": "FragmentSpread",
              "name": "EnvironmentSymbol_environment",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node/*: any*/).hash = 'd520e01db5a7f98a5b1cd68469f52459';
module.exports = node;
