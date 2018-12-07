import gql from "graphql-tag";

export const GET_MAIN_MENU = gql`
  fragment TopMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    url
    level
  }

  query TopMenu {
    shop {
      navigation {
        main {
          id
          items {
            ...TopMenuSubItem
            children {
              ...TopMenuSubItem
              children {
                ...TopMenuSubItem
              }
            }
          }
        }
      }
    }
  }
`;
