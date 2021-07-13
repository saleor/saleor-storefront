import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

// import { TextField } from "@components/molecules";
import { commonMessages } from "@temp/intl";

import "./scss/index.scss";

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

  // const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
  //   const newQuantity = parseInt(evt.target.value, 10);

  //   if (quantity !== newQuantity) {
  //     if (newQuantity >= 1) {
  //       onQuantityChange(newQuantity);
  //     } else {
  //       onQuantityChange(0);
  //     }
  //   }
  //   setIsTooMuch(!isNaN(newQuantity) && newQuantity > maxQuantity);
  // };

  const handleQuantityChangeDown = (evt: React.ChangeEvent<any>) => {
    const newQuantity = quantity - 1;

    if (quantity !== newQuantity) {
      if (newQuantity >= 1) {
        onQuantityChange(newQuantity);
      } else {
        onQuantityChange(0);
      }
    }
  };

  const handleQuantityChangeUp = (evt: React.ChangeEvent<any>) => {
    const newQuantity = quantity + 1;

    if (quantity !== newQuantity) {
      if (newQuantity >= 1) {
        onQuantityChange(newQuantity);
      } else {
        onQuantityChange(0);
      }
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
    <div className="ChangeCountWrapper">
      <div className="ChangeCount" onClick={handleQuantityChangeDown}>
        <p>-</p>
      </div>
      {/* <TextField
        className="CountProduct"
        name="quantity"
        type="number"
        // label={intl.formatMessage(commonMessages.quantity)}
        min="1"
        value={quantity.toString()}
        disabled={disabled}
        // onChange={handleQuantityChange}
        errors={quantityErrors}
        data-test={testingContext}
        data-testId={testingContextId}
      /> */}
      <div className="CountProduct">
        <p>{quantity}</p>
        <p>{quantity > maxQuantity ? quantityErrors : ""}</p>
      </div>
      <div className="ChangeCount" onClick={handleQuantityChangeUp}>
        <p>+</p>
      </div>
    </div>
  );
};
QuantityInput.displayName = "QuantityInput";
export default QuantityInput;
