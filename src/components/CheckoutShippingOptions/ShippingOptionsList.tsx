import * as React from "react";

import { Checkout } from "../CheckoutApp/types/Checkout";

const ShippingOptionsList: React.SFC<{
  checkout: Checkout;
  selected: string;
  onShippingSelect(shippingId: string): void;
}> = ({ checkout, selected, onShippingSelect }) => (
  <div className="checkout-shipping-options__form">
    {checkout.availableShippingMethods.map(method => (
      <div
        key={method.id}
        className={`checkout-shipping-options__form__option${
          selected === method.id
            ? " checkout-shipping-options__form__option--selected"
            : ""
        }`}
        onClick={() => onShippingSelect(method.id)}
      >
        <input type="radio" name="shippingOprtions" value={method.id} />
        <label>
          {method.name} | +{method.price.localized}
        </label>
      </div>
    ))}
  </div>
);

export default ShippingOptionsList;
