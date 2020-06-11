import React from "react";

import AddToCartButton from "./AddToCartButton";

const AddToCart: React.FC<{
  disabled: boolean;
  onSubmit: () => void;
}> = ({ onSubmit, disabled }) => {
  return (
    <AddToCartButton
      dataCy="detailsPageAddProductToCartButton"
      className="product-description__action"
      onClick={() => {
        onSubmit();
      }}
      disabled={disabled}
    >
      Dodaj do koszyka
    </AddToCartButton>
  );
};

export default AddToCart;
