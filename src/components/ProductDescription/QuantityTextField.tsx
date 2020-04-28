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
    let newTempQuantity = newQuantity.toString(); // To make newTempQuantity consistent with newQuantity

    if (isNaN(newQuantity) || newQuantity <= 0) {
      newTempQuantity = quantity.toString();
      newQuantity = quantity;
    }

    if (tempQuantity !== newTempQuantity) {
      setTempQuantity(newTempQuantity);
    }
    if (quantity !== newQuantity) {
      onQuantityChange(newQuantity);
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
