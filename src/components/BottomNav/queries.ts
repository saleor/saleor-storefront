import gql from "graphql-tag";

export const GET_SECONDARY_MENU = gql`
  fragment BottomMenuSubItem on MenuItem {
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

  query BottomMenu {
    shop {
      navigation {
        secondary {
          items {
            ...BottomMenuSubItem
            children {
              ...BottomMenuSubItem
            }
          }
        }
      }
    }
  }
`;
