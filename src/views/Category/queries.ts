import gql from "graphql-tag";

export const GET_CATEGORY_AND_ATTRIBUTES = gql`
  query Category(
    $id: ID!
    $attributes: [AttributeScalar]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
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
          thumbnailUrl2x: thumbnailUrl(size: 510)
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    category(id: $id) {
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
    attributes(inCategory: $id, first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;
