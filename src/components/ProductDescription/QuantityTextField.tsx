import React, { useEffect, useState } from "react";

import { TextField } from "@components/molecules";

interface QuantityTextFieldProps {
  quantity: number;
  maxQuantity: number;
  disabled: boolean;
  onQuantityChange: (value: number) => void;
  hideErrors: boolean;
}

export const QuantityTextField: React.FC<QuantityTextFieldProps> = ({
  disabled,
  quantity,
  maxQuantity,
  onQuantityChange,
  hideErrors,
}: QuantityTextFieldProps) => {
  const [isTooMuch, setIsTooMuch] = useState(false);

  useEffect(() => {
    setIsTooMuch(!isNaN(quantity) && quantity > maxQuantity);
  }, [quantity, maxQuantity]);

  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    const newQuantity = parseInt(evt.target.value, 10);

    if (quantity !== newQuantity) {
      onQuantityChange(newQuantity);
    }
    setIsTooMuch(!isNaN(newQuantity) && newQuantity > maxQuantity);
  };

  const quantityErrors =
    !hideErrors && isTooMuch
      ? [
          {
            message: `Maximum quantity is ${maxQuantity}`,
          },
        ]
      : undefined;

  return (
    <TextField
      dataCy="productQuantityField"
      type="number"
      label="Quantity"
      min="1"
      value={quantity.toString()}
      disabled={disabled}
      onChange={handleQuantityChange}
      errors={quantityErrors}
    />
  );
};
