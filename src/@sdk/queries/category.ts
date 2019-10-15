import gql from "graphql-tag";

export const categoryQuery = gql`
  query CategoryDetails($id: ID!) {
    category(id: $id) {
      seoDescription
      seoTitle
      id
      name
      backgroundImage {
        url
      }
      ancestors(last: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
