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
      products(
        attributes: $attributes
        first: $pageSize
        sortBy: $sortBy
        price_Lte: $priceLte
        price_Gte: $priceGte
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
