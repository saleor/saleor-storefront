import React from "react";

import { AddToWishlistButton } from "@components/molecules";
import { useAddWishlistProduct, useRemoveWishlistProduct } from "@sdk/react";
import { WishlistContext } from "@temp/@sdk/react/components/WishlistProvider/context";

const AddToWishlist: React.FC<{ productId: string }> = ({ productId }) => {
  const { wishlist, update } = React.useContext(WishlistContext);

  const isAddedToWishlist = () => {
    return wishlist && wishlist.some(({ product }) => product.id === productId);
  };

  const [addedToWishlist, setAddedToWishlist] = React.useState(
    isAddedToWishlist()
  );

  const {} = useAddWishlistProduct({ productId });
  const {} = useRemoveWishlistProduct({ productId });

  const addOrRemoveFromWishlist = () => {
    // TODO
  };

  return (
    <AddToWishlistButton
      added={addedToWishlist}
      onClick={addOrRemoveFromWishlist}
    />
  );
};

export default AddToWishlist;
