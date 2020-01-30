import React from "react";

import { WishlistItem } from "@sdk/fragments/types/WishlistItem";

import { WishlistContext } from "./context";
import { IProps } from "./types";

export function WishlistProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const [state, setState] = React.useState<{ wishlist: WishlistItem[] }>({
    wishlist: [],
  });

  const update = (wishlist: WishlistItem[]) => {
    setState({ wishlist });
  };

  const getContext = () => ({
    ...state,
    update,
  });

  return (
    <WishlistContext.Provider value={getContext()}>
      {children}
    </WishlistContext.Provider>
  );
}
