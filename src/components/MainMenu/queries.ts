import gql from "graphql-tag";

export const GET_MAIN_MENU = gql`
  query MainMenu {
    shop {
      navigation {
        main {
          id
          items {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
