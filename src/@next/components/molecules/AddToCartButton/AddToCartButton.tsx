import React from "react";
import { FormattedMessage } from "react-intl";

import { Button } from "@components/atoms";

import "./scss/index.scss";

export interface IAddToCartButton {
  disabled: boolean;
  onSubmit: () => void;
}

export const AddToCartButton: React.FC<IAddToCartButton> = ({
  onSubmit,
  disabled,
}) => {
  return (
    <Button
      className={
        disabled ? "buttonAddProductUnActive" : "buttonAddProductActive"
      }
      fullWidth
      testingContext="addProductToCartButton"
      onClick={onSubmit}
      disabled={disabled}
    >
      <FormattedMessage defaultMessage="Mua ngay" />
    </Button>
  );
};
AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
