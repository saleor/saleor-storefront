import React from "react";

import { WishlistItem } from "@sdk/fragments/types/WishlistItem";
import { useUserWishlist } from "@sdk/react";

import { ApolloErrorWithUserInput } from "../../types";
import { WishlistContext } from "./context";
import { IProps } from "./types";

const WHISHLIST_ITEMS_PER_API_CALL = 100;

export function WishlistProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const { data, loading, error, loadMore, refetch } = useUserWishlist({
    first: WHISHLIST_ITEMS_PER_API_CALL,
  });

  const [state, setState] = React.useState<{
    wishlist: WishlistItem[] | null;
    loading: boolean;
    error: ApolloErrorWithUserInput | null;
  }>({
    error,
    loading,
    wishlist: data && data.edges.map(({ node }) => node),
  });

  React.useEffect(() => {
    if (data && data.pageInfo.hasNextPage) {
      loadMore({
        after: data!.pageInfo.endCursor,
        first: WHISHLIST_ITEMS_PER_API_CALL,
      });
    }
  }, [data]);

  const update = (wishlist: WishlistItem[]) => {
    setState(state => ({ ...state, wishlist }));
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
