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

const secondaryMenuPartner = gql`
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
    menu(id: "TWVudTo1") {
      items {
        ...SecondaryMenuSubItem
        children {
          ...SecondaryMenuSubItem
        }
      }
    }
  }
`;

const secondaryMenuPartnerEN = gql`
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
    menu(id: "TWVudTo4") {
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

export const TypedSecondaryMenuQueryPartner = TypedQuery<SecondaryMenu, {}>(
  secondaryMenuPartner
);

export const TypedSecondaryMenuQueryPartnerEN = TypedQuery<SecondaryMenu, {}>(
  secondaryMenuPartnerEN
);
