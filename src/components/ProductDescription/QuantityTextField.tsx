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
  const [tempQuantity, setTempQuantity] = useState<number | string>(quantity);
  const [isTooMuch, setIsTooMuch] = useState(false);

  const handleBlurQuantityInput = () => {
    const newQuantity =
      typeof tempQuantity === "number"
        ? tempQuantity
        : parseInt(tempQuantity, 10);
    const notEnoughQuantity = isNaN(newQuantity) || newQuantity <= 0;
    if (notEnoughQuantity) {
      setTempQuantity(quantity);
    }
  };

  useEffect(() => {
    setTempQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    setIsTooMuch(quantity > maxQuantity);
  }, [quantity, maxQuantity]);

  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    const newQuantity = parseInt(evt.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(newQuantity);
    } else {
      setTempQuantity(evt.target.value);
    }
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
