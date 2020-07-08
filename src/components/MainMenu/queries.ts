import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { MainMenu, MainMenuVariables } from "./gqlTypes/MainMenu";

export const mainMenu = gql`
  fragment MainMenuSubItem on MenuItem {
    id
    name
    translation(languageCode: $locale) {
      name
    }
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

  query MainMenu($locale: LanguageCodeEnum!) {
    shop {
      navigation {
        main {
          id
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
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, MainMenuVariables>(
  mainMenu
);
