/**
 * @flow
 * @relayHash 41f6834bafd2a525a639c4e85012ea1f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppFrame_environment$ref = any;
type AppFrame_viewer$ref = any;
export type AppWrapperQueryVariables = {|
  environment: string,
  organization: string,
|};
export type AppWrapperQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: AppFrame_viewer$ref,
  |},
  +environment: ?{|
    +$fragmentRefs: AppFrame_environment$ref,
  |},
|};
*/


/*
query AppWrapperQuery(
  $environment: String!
  $organization: String!
) {
  viewer {
    ...AppFrame_viewer
  }
  environment(organization: $organization, environment: $environment) {
    ...AppFrame_environment
    id
  }
}

fragment AppFrame_viewer on Viewer {
  ...Drawer_viewer
}

fragment AppFrame_environment on Environment {
  ...AppBar_environment
  ...Drawer_environment
}

fragment AppBar_environment on Environment {
  ...EnvironmentLabel_environment
}

fragment Drawer_environment on Environment {
  ...EnvironmentIcon_environment
}

fragment EnvironmentIcon_environment on Environment {
  colourId
  organization {
    iconId
    id
  }
}

fragment EnvironmentLabel_environment on Environment {
  name
  colourId
  organization {
    name
    iconId
    id
  }
}

fragment Drawer_viewer on Viewer {
  ...NamespaceSelector_viewer
}

fragment NamespaceSelector_viewer on Viewer {
  ...NamespaceSelectorMenu_viewer
}

fragment NamespaceSelectorMenu_viewer on Viewer {
  organizations {
    name
    ...OrganizationIcon_organization
    environments {
      name
      ...EnvironmentSymbol_environment
      id
    }
    id
  }
}

fragment OrganizationIcon_organization on Organization {
  iconId
}

fragment EnvironmentSymbol_environment on Environment {
  colourId
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "environment",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "organization",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "environment",
    "variableName": "environment",
    "type": "String!"
  },
  {
    "kind": "Variable",
    "name": "organization",
    "variableName": "organization",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "iconId",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "colourId",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AppWrapperQuery",
  "id": null,
  "text": "query AppWrapperQuery(\n  $environment: String!\n  $organization: String!\n) {\n  viewer {\n    ...AppFrame_viewer\n  }\n  environment(organization: $organization, environment: $environment) {\n    ...AppFrame_environment\n    id\n  }\n}\n\nfragment AppFrame_viewer on Viewer {\n  ...Drawer_viewer\n}\n\nfragment AppFrame_environment on Environment {\n  ...AppBar_environment\n  ...Drawer_environment\n}\n\nfragment AppBar_environment on Environment {\n  ...EnvironmentLabel_environment\n}\n\nfragment Drawer_environment on Environment {\n  ...EnvironmentIcon_environment\n}\n\nfragment EnvironmentIcon_environment on Environment {\n  colourId\n  organization {\n    iconId\n    id\n  }\n}\n\nfragment EnvironmentLabel_environment on Environment {\n  name\n  colourId\n  organization {\n    name\n    iconId\n    id\n  }\n}\n\nfragment Drawer_viewer on Viewer {\n  ...NamespaceSelector_viewer\n}\n\nfragment NamespaceSelector_viewer on Viewer {\n  ...NamespaceSelectorMenu_viewer\n}\n\nfragment NamespaceSelectorMenu_viewer on Viewer {\n  organizations {\n    name\n    ...OrganizationIcon_organization\n    environments {\n      name\n      ...EnvironmentSymbol_environment\n      id\n    }\n    id\n  }\n}\n\nfragment OrganizationIcon_organization on Organization {\n  iconId\n}\n\nfragment EnvironmentSymbol_environment on Environment {\n  colourId\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AppWrapperQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "__viewer_viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AppFrame_viewer",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "environment",
        "storageKey": null,
        "args": v1,
        "concreteType": "Environment",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AppFrame_environment",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppWrapperQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
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
              v2,
              v3,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "environments",
                "storageKey": null,
                "args": null,
                "concreteType": "Environment",
                "plural": true,
                "selections": [
                  v2,
                  v4,
                  v5
                ]
              },
              v5
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "viewer",
        "args": null,
        "handle": "viewer",
        "key": "",
        "filters": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "environment",
        "storageKey": null,
        "args": v1,
        "concreteType": "Environment",
        "plural": false,
        "selections": [
          v2,
          v4,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "organization",
            "storageKey": null,
            "args": null,
            "concreteType": "Organization",
            "plural": false,
            "selections": [
              v2,
              v3,
              v5
            ]
          },
          v5
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'abcdea68deae037464413e8b59ed5334';
module.exports = node;
