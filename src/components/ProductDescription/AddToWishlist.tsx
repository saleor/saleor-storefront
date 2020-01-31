import React from "react";

import { AddToWishlistButton } from "@components/molecules";
import { useAddWishlistProduct, useRemoveWishlistProduct } from "@sdk/react";
import { WishlistContext } from "@sdk/react/components/WishlistProvider/context";

const AddToWishlist: React.FC<{ productId: string }> = ({ productId }) => {
  const { wishlist, update } = React.useContext(WishlistContext);

  const isAddedToWishlist = () => {
    return wishlist && wishlist.some(({ product }) => product.id === productId);
  };

  const [addedToWishlist, setAddedToWishlist] = React.useState(
    isAddedToWishlist()
  );

  const [
    addWishlistProduct,
    { data: addData, loading: addLoading, error: addError },
  ] = useAddWishlistProduct({ productId });
  const [
    removeWishlistProduct,
    { data: removeData, loading: removeLoading, error: removeError },
  ] = useRemoveWishlistProduct({ productId });

  const addOrRemoveFromWishlist = () => {
    if (addedToWishlist) {
      removeWishlistProduct({ productId });
    } else {
      addWishlistProduct({ productId });
    }
  };

  return (
    <AddToWishlistButton
      added={addedToWishlist}
      onClick={addOrRemoveFromWishlist}
    />
  );
};

export default AddToWishlist;
