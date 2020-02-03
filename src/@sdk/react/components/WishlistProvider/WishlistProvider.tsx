import React from "react";

import { useUserWishlist } from "@sdk/react";

import { WishlistContext } from "./context";
import { IProps } from "./types";

const WHISHLIST_ITEMS_PER_API_CALL = 100;

export function WishlistProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const { data, loading, error, loadMore, refetch } = useUserWishlist({
    first: WHISHLIST_ITEMS_PER_API_CALL,
  });

  React.useEffect(() => {
    if (data && data.pageInfo.hasNextPage) {
      loadMore({
        after: data!.pageInfo.endCursor,
        first: WHISHLIST_ITEMS_PER_API_CALL,
      });
    }
  }, [data]);

  const update = () => {
    refetch({
      first: WHISHLIST_ITEMS_PER_API_CALL,
    });
  };

  const getContext = () => ({
    error,
    loading,
    update,
    wishlist: data && data.edges.map(({ node }) => node),
  });

  return (
    <WishlistContext.Provider value={getContext()}>
      {children}
    </WishlistContext.Provider>
  );
}
