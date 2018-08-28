import gql from "graphql-tag";

export const GET_MAIN_MENU = gql`
  query MainMenu {
    menus(query: "navbar") {
      edges {
        node {
          name
          items {
            edges {
              node {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;
