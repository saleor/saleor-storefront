import React from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "../../@next/components/atoms";


const AddToCart: React.FC<{
  disabled: boolean;
  onSubmit: () => void;
}> = ({ onSubmit, disabled }) => {
  return (
    <Button
      fullWidth
      testingContext="addProductToCartButton"
      className="product-description__action"
      onClick={onSubmit}
      color="primary"
      disabled={disabled}
    >
      <FormattedMessage defaultMessage="Add to basket" />
    </Button>
  );
};

export default AddToCart;
