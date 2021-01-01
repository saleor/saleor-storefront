import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { MainMenu } from "./gqlTypes/MainMenu";

export const mainMenu = gql`
  fragment MainMenuSubItem on MenuItem {
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
    parent {
      id
    }
  }

  query MainMenu {
    menu(id: "TWVudTox") {
      items {
        ...MainMenuSubItem
        children {
          ...MainMenuSubItem
          children {
            ...MainMenuSubItem
          }
        }
      }
    }
  }
`;

export const mainMenuEN = gql`
  fragment MainMenuSubItem on MenuItem {
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
    parent {
      id
    }
  }

  query MainMenu {
    menu(id: "TWVudTo0") {
      items {
        ...MainMenuSubItem
        children {
          ...MainMenuSubItem
          children {
            ...MainMenuSubItem
          }
        }
      }
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, {}>(mainMenu);

export const TypedMainMenuQueryEN = TypedQuery<MainMenu, {}>(mainMenuEN);
