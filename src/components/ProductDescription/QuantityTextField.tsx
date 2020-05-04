import React, { useEffect, useState } from "react";

import { TextField } from "@components/molecules";

interface QuantityTextFieldProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (value: number) => void;
  hideErrors: boolean;
}

export const QuantityTextField: React.FC<QuantityTextFieldProps> = ({
  quantity,
  maxQuantity,
  onQuantityChange,
  hideErrors,
}: QuantityTextFieldProps) => {
  const [tempQuantity, setTempQuantity] = useState<string>(quantity.toString());
  const [isTooMuch, setIsTooMuch] = useState(false);

  const handleBlurQuantityInput = () => {
    let newQuantity = parseInt(tempQuantity, 10);

    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = quantity;
    }

    if (quantity !== newQuantity) {
      onQuantityChange(newQuantity);
    }

    const newTempQuantity = newQuantity.toString();
    if (tempQuantity !== newTempQuantity) {
      setTempQuantity(newTempQuantity);
    }

    setIsTooMuch(!isNaN(newQuantity) && newQuantity > maxQuantity);
  };

  useEffect(() => {
    setTempQuantity(quantity.toString());
  }, [quantity]);

  useEffect(() => {
    setIsTooMuch(!isNaN(quantity) && quantity > maxQuantity);
  }, [quantity, maxQuantity]);

  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    const newQuantity = parseInt(evt.target.value, 10);

    setTempQuantity(evt.target.value);

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
      type="number"
      label="Quantity"
      min="1"
      value={tempQuantity || ""}
      onBlur={handleBlurQuantityInput}
      onChange={handleQuantityChange}
      errors={quantityErrors}
    />
  );
};
