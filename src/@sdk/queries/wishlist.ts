import gql from "graphql-tag";

export const userWishlist = gql`
  query Wishlist(
    $after: String
    $first: Int
    $afterVariants: String
    $firstVariants: Int
  ) {
    me {
      id
      wishlist(after: $after, first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            product {
              id
              name
            }
            variants(after: $afterVariants, first: $firstVariants) {
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
  }
`;
