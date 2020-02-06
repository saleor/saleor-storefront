import React from "react";

import { Message } from "@components/atoms";
import { AddToWishlistButton } from "@components/molecules";
import {
  useAddRemoveWishlistProductVariant,
  useAddWishlistProductVariant,
  useUserDetails,
} from "@sdk/react";
import { WishlistContext } from "@sdk/react/components/WishlistProvider/context";

const AddToWishlist: React.FC<{
  productVariantId: string;
}> = ({ productVariantId }) => {
  const { wishlist, update } = React.useContext(WishlistContext);
  const { data: user } = useUserDetails();

  const [showAddMessage, setShowAddMessage] = React.useState(false);
  const [showRemoveMessage, setShowRemoveMessage] = React.useState(false);
  const [showNotLoggedMessage, setShowNotLoggedMessage] = React.useState(false);

  const isAddedToWishlist = () => {
    return (
      wishlist &&
      wishlist.some(({ variants }) =>
        variants.edges.some(
          ({ node: { id: wishlistVariantId } }) =>
            productVariantId === wishlistVariantId
        )
      )
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
  }, [wishlist, productVariantId]);

  const [
    addWishlistProductVariant,
    { loading: addLoading, error: addError },
  ] = useAddWishlistProductVariant({ variantId: productVariantId });
  const [
    removeWishlistProductVariant,
    { loading: errorLoading, error: removeError },
  ] = useAddRemoveWishlistProductVariant({ variantId: productVariantId });

  const addOrRemoveFromWishlist = () => {
    if (!user) {
      setShowNotLoggedMessage(true);
      return;
    }
    if (addedToWishlist) {
      removeWishlistProductVariant({ variantId: productVariantId });
      update();
      setShowAddMessage(false);
      setShowRemoveMessage(true);
    } else {
      addWishlistProductVariant({ variantId: productVariantId });
      update();
      setShowRemoveMessage(false);
      setShowAddMessage(true);
    }
  };

  const handleRemoveMessageClose = () => {
    setShowRemoveMessage(false);
  };
  const handleAddMessageClose = () => {
    setShowAddMessage(false);
  };
  const handleNotLoggedMessageClose = () => {
    setShowNotLoggedMessage(false);
  };

  const getRemoveMessage = () =>
    !removeError
      ? "Product removed from wishlist"
      : "Error while removing product from wishlist";
  const getAddMessage = () =>
    !addError
      ? "Product added to wishlist"
      : "Error while adding product to wishlist";

  return (
    <>
      <AddToWishlistButton
        added={addedToWishlist}
        onClick={addOrRemoveFromWishlist}
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

export default AddToWishlist;
