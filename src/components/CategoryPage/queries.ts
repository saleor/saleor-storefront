import gql from "graphql-tag";

export const GET_CATEGORY_AND_ATTRIBUTES = gql`
  query Category(
    $id: ID!
    $attributes: [AttributeScalar]
    $pageSize: Int
    $sortBy: String
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      attributes: $attributes
      categories: [$id]
      first: $pageSize
      sortBy: $sortBy
      priceLte: $priceLte
      priceGte: $priceGte
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
          }
        }
      }
    }
    category(id: $id) {
      id
      name
      backgroundImage {
        url
      }
      ancestors {
        edges {
          node {
            id
            name
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
