import gql from "graphql-tag";

import { wishlistItemFragment } from "../fragments/wishlist";

export const userWishlist = gql`
  ${wishlistItemFragment}
  query UserWishlist {
    me {
      id
      wishlist {
        edges {
          node {
            ...WishlistItem
          }
        }
      }
    }
  }
`;
