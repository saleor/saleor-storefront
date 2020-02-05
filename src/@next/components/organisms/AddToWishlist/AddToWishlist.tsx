import React from "react";

import { Message } from "@components/atoms";
import { AddToWishlistButton } from "@components/molecules";
import {
  useAddWishlistProduct,
  useRemoveWishlistProduct,
  useUserDetails,
} from "@sdk/react";
import { WishlistContext } from "@sdk/react/components/WishlistProvider/context";

import { IProps } from "./types";

export const AddToWishlist: React.FC<IProps> = ({
  productId,
  showButtonText = true,
}: IProps) => {
  const { wishlist, update } = React.useContext(WishlistContext);
  const { data: user } = useUserDetails();

  const [showAddMessage, setShowAddMessage] = React.useState(false);
  const [showRemoveMessage, setShowRemoveMessage] = React.useState(false);
  const [showNotLoggedMessage, setShowNotLoggedMessage] = React.useState(false);

  const isAddedToWishlist = () => {
    return (
      !!wishlist && wishlist.some(({ product }) => product.id === productId)
    );
  };

  const [addedToWishlist, setAddedToWishlist] = React.useState(
    isAddedToWishlist()
  );

  React.useEffect(() => {
    const added = isAddedToWishlist();

    if (added !== addedToWishlist) {
      setAddedToWishlist(added);
    }
  }, [wishlist]);

  const [
    addWishlistProduct,
    { loading: addLoading, error: addError },
  ] = useAddWishlistProduct({ productId });
  const [
    removeWishlistProduct,
    { loading: errorLoading, error: removeError },
  ] = useRemoveWishlistProduct({ productId });

  const addOrRemoveFromWishlist = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) {
      setShowNotLoggedMessage(true);
      return;
    }
    if (addedToWishlist) {
      removeWishlistProduct({ productId });
      update();
      setShowAddMessage(false);
      setShowRemoveMessage(true);
    } else {
      addWishlistProduct({ productId });
      update();
      setShowRemoveMessage(false);
      setShowAddMessage(true);
    }
  };

  const handleRemoveMessageClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowRemoveMessage(false);
  };
  const handleAddMessageClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowAddMessage(false);
  };
  const handleNotLoggedMessageClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowNotLoggedMessage(false);
  };

  const getRemoveMessage = () =>
    !addError
      ? "Product removed from wishlist"
      : "Error while removing product from wishlist";
  const getAddMessage = () =>
    !removeError
      ? "Product added to wishlist"
      : "Error while adding product to wishlist";

  return (
    <>
      <AddToWishlistButton
        added={addedToWishlist}
        onClick={addOrRemoveFromWishlist}
        showText={showButtonText}
      />
      {showAddMessage && !addLoading && (
        <Message
          title={getAddMessage()}
          status={addError ? "error" : "success"}
          onClick={handleAddMessageClose}
        ></Message>
      )}
      {showRemoveMessage && !errorLoading && (
        <Message
          title={getRemoveMessage()}
          status={removeError ? "error" : "success"}
          onClick={handleRemoveMessageClose}
        ></Message>
      )}
      {showNotLoggedMessage && (
        <Message
          title="Please log in to add the product to your wish list"
          status="error"
          onClick={handleNotLoggedMessageClose}
        ></Message>
      )}
    </>
  );
};
