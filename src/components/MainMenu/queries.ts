import gql from "graphql-tag";

export const GET_MAIN_MENU = gql`
  query MainMenu {
    shop {
      navigation {
        main {
          id
          items {
            id
            name
            category {
              id
            }
          }
        }
      }
    }
  }
`;
