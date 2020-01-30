import * as React from "react";

import { WishlistItem } from "@sdk/fragments/types/WishlistItem";

export interface IWishlistContext {
  wishlist: WishlistItem[];
  update(wishlist: WishlistItem[]): void;
}

export const WishlistContext = React.createContext<IWishlistContext>({
  update: wishlist => null,
  wishlist: [],
});

WishlistContext.displayName = "WishlistContext";
