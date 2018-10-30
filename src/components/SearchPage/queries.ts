import gql from "graphql-tag";

export const GET_SEARCH_PRODUCTS = gql`
  query SearchProducts(
    $query: String!
    $attributes: [AttributeScalar]
    $pageSize: Int
    $sortBy: String
  ) {
    products(
      query: $query
      attributes: $attributes
      first: $pageSize
      sortBy: $sortBy
    ) {
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
            localized
          }
        }
      }
    }
    attributes {
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
