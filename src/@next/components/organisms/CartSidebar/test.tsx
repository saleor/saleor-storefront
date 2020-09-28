import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartSidebar } from ".";
import {
  ITEMS,
  PROMO_PRICE,
  SHIPPING_PRICE,
  SUBTOTAL_PRICE,
  TOTAL_PRICE,
} from "./fixtures";

const hide = jest.fn();
const removeItem = jest.fn();
const updateItem = jest.fn();
const continueShopping = jest.fn();
const proceedToCheckout = jest.fn();

describe("<CartSidebar />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <CartSidebar
        items={ITEMS}
        removeItem={removeItem}
        updateItem={updateItem}
        totalPrice={TOTAL_PRICE}
        subtotalPrice={SUBTOTAL_PRICE}
        shippingTaxedPrice={SHIPPING_PRICE}
        promoTaxedPrice={PROMO_PRICE}
        show
        hide={hide}
        continueShopping={continueShopping}
        proceedToCheckout={proceedToCheckout}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
