import React from "react";
import { FormattedMessage } from "react-intl";

import AddToCartButton from "./AddToCartButton";

const AddToCart: React.FC<{
  disabled: boolean;
  onSubmit: () => void;
}> = ({ onSubmit, disabled }) => {
  return (
    <AddToCartButton
      testingContext="addProductToCartButton"
      className="product-description__action"
      onClick={() => {
        onSubmit();
      }}
      disabled={disabled}
    >
      <FormattedMessage defaultMessage="Add to basket" />
    </AddToCartButton>
  );
};

export default AddToCart;
