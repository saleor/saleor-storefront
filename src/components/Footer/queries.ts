import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { SecondaryMenu } from "./gqlTypes/SecondaryMenu";

const secondaryMenu = gql`
  fragment SecondaryMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
  }

  query SecondaryMenu {
    menu(id: "TWVudToy") {
      items {
        ...SecondaryMenuSubItem
        children {
          ...SecondaryMenuSubItem
        }
      }
    }
  }
`;

const secondaryMenuEN = gql`
  fragment SecondaryMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
  }

  query SecondaryMenu {
    menu(id: "TWVudToz") {
      items {
        ...SecondaryMenuSubItem
        children {
          ...SecondaryMenuSubItem
        }
      }
    }
  }
`;

export const TypedSecondaryMenuQuery = TypedQuery<SecondaryMenu, {}>(
  secondaryMenu
);

export const TypedSecondaryMenuQueryEN = TypedQuery<SecondaryMenu, {}>(
  secondaryMenuEN
);
