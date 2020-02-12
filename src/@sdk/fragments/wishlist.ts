import gql from "graphql-tag";

export const wishlistItemFragment = gql`
  fragment WishlistItem on WishlistItem {
    id
    product {
      id
      name
    }
  }
`;
