import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { SecondaryMenu, SecondaryMenuVariables} from "./types/SecondaryMenu";

const secondaryMenu = gql`
  fragment SecondaryMenuSubItem on MenuItem {
    id
    name
    translation(languageCode:$locale){name}
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

  query SecondaryMenu(
    $locale:LanguageCodeEnum!
  ) {
    shop {
      navigation {
        secondary {
          items {
            ...SecondaryMenuSubItem
            children {
              ...SecondaryMenuSubItem
            }
          }
        }
      }
    }
  }
`;

export const TypedSecondaryMenuQuery = TypedQuery<SecondaryMenu, SecondaryMenuVariables>(secondaryMenu);
