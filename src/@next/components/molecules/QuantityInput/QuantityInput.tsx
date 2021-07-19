// import { CollectionSortField } from "@saleor/sdk";
import React /* useEffect, useState */ from "react";

// import { Input } from "@components/atoms";
// import { useIntl } from "react-intl";
// import { TextField } from "@components/molecules";
// import { commonMessages } from "@temp/intl";
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
  // const [isTooMuch, setIsTooMuch] = useState(false);
  // const intl = useIntl();

  // useEffect(() => {
  //   setIsTooMuch(!isNaN(quantity) && quantity > maxQuantity);
  // }, [quantity, maxQuantity]);

  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    const newQuantity = parseInt(evt.target.value, 10);
    if (maxQuantity <= 0 || isNaN(newQuantity)) {
      onQuantityChange(0);
    } else if (quantity !== newQuantity) {
      if (newQuantity < maxQuantity) {
        onQuantityChange(newQuantity);
      } else {
        onQuantityChange(maxQuantity);
      }
    }

    // setIsTooMuch(!isNaN(newQuantity) && newQuantity > maxQuantity);
  };

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
    let newQuantity;
    if (maxQuantity > 0) {
      newQuantity = quantity + 1;
      if (newQuantity >= maxQuantity) {
        newQuantity = maxQuantity;
      }
    } else {
      newQuantity = 0;
    }
    onQuantityChange(newQuantity);

    // setIsTooMuch(!isNaN(newQuantity) && newQuantity > maxQuantity);
  };

  // const quantityErrors =
  //   !hideErrors && isTooMuch
  //     ? [
  //         {
  //           message: intl.formatMessage(commonMessages.maxQtyIs, {
  //             maxQuantity,
  //           }),
  //         },
  //       ]
  //     : undefined;
  return (
    <div className="Wrapper">
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
      <span className="LabelOption">Số lượng:</span>
      <div className="ChangeCountWrapper">
        <div className="ChangeCount" onClick={handleQuantityChangeDown}>
          <p>-</p>
        </div>
        <input
          name="quantity"
          onChange={handleQuantityChange}
          className="InputCountProduct"
          value={maxQuantity === 0 ? 0 : maxQuantity < 0 ? 0 : quantity}
        />
        <div className="ChangeCount" onClick={handleQuantityChangeUp}>
          <p>+</p>
        </div>
      </div>
      <span className="ProductInventory">
        Còn{" "}
        {maxQuantity <= 0
          ? maxQuantity < 0
            ? 0
            : maxQuantity
          : maxQuantity - quantity}{" "}
        sản phẩm
      </span>
    </div>
  );
};
export default QuantityInput;
