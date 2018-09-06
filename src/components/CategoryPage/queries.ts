import gql from "graphql-tag";

export const GET_CATEGORY_AND_ATTRIBUTES = gql`
  query Category($id: ID!, $attributes: [AttributeScalar], $pageSize: Int) {
    category(id: $id) {
      id
      name
      backgroundImage
      ancestors {
        edges {
          node {
            id
            name
          }
        }
      }
      products(attributes: $attributes, first: $pageSize) {
        totalCount
        edges {
          node {
            id
            name
            thumbnailUrl
            category {
              id
              name
            }
            price {
              amount
              currency
            }
          }
        }
      }
    }
    attributes(inCategory: $id) {
      edges {
        node {
          id
          name
          values {
            id
            name
          }
        }
      }
    }
  }
`;
