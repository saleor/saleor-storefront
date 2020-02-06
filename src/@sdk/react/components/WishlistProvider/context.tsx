import * as React from "react";

import { Wishlist_me_wishlist_edges_node } from "@sdk/queries/types/Wishlist";

import { ApolloErrorWithUserInput } from "../../types";

export interface IWishlistContext {
  wishlist: Wishlist_me_wishlist_edges_node[] | null;
  loading: boolean;
  error: ApolloErrorWithUserInput | null;
  update(): void;
}

export const WishlistContext = React.createContext<IWishlistContext>({
  error: null,
  loading: false,
  update: () => null,
  wishlist: [],
});

WishlistContext.displayName = "WishlistContext";
