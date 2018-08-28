import gql from "graphql-tag";

export const GET_MAIN_MENU = gql`
  query MainMenu {
    menus(query: "navbar") {
      edges {
        node {
          id
          name
          items {
            edges {
              node {
                id
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
