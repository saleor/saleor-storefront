import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { TextField } from "@components/molecules";
import { commonMessages } from "@temp/intl";

export interface IQuantityInput {
  quantity: number;
  maxQuantity: number;
  disabled: boolean;
  onQuantityChange: (value: number) => void;
  hideErrors: boolean;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}

export const QuantityInput: React.FC<IQuantityInput> = ({
  disabled,
  quantity,
  maxQuantity,
  onQuantityChange,
  hideErrors,
  testingContext,
  testingContextId,
}) => {
  const [isTooMuch, setIsTooMuch] = useState(false);
  const intl = useIntl();

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
            message: intl.formatMessage(commonMessages.maxQtyIs, {
              maxQuantity,
            }),
          },
        ]
      : undefined;

  return (
    <TextField
      name="quantity"
      type="number"
      label={intl.formatMessage(commonMessages.quantity)}
      min="1"
      value={quantity.toString()}
      disabled={disabled}
      onChange={handleQuantityChange}
      errors={quantityErrors}
      data-test={testingContext}
      data-testId={testingContextId}
    />
  );
};
QuantityInput.displayName = "QuantityInput";
export default QuantityInput;
