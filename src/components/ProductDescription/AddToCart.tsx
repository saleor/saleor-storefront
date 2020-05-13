import React from "react";

import AddToCartButton from "./AddToCartButton";

import { useIntl } from "react-intl"

const AddToCart: React.FC<{
  disabled: boolean;
  onSubmit: () => void;
}> = ({ onSubmit, disabled }) => {
  const intl = useIntl();

  return (
    <AddToCartButton
      className="product-description__action"
      onClick={() => {
        onSubmit();
      }}
      disabled={disabled}
    >
      {
        intl.formatMessage({
          defaultMessage: "Add to basket",
        })
      }
    </AddToCartButton>
  );
};

export default AddToCart;
