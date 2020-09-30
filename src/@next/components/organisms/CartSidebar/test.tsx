import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";

import { CartSummaryCosts } from "@components/molecules";
import { CartSidebar } from ".";
import {
  ITEMS,
  PROMO_PRICE,
  SHIPPING_PRICE,
  SUBTOTAL_PRICE,
  TOTAL_PRICE,
} from "./fixtures";
import { CartRow } from "..";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

describe("<CartSidebar />", () => {
  it("exists", () => {
    const hide = jest.fn();
    const removeItem = jest.fn();
    const updateItem = jest.fn();
    const continueShopping = jest.fn();
    const goToCart = jest.fn();
    const proceedToCheckout = jest.fn();

    const wrapper = mount(
      <IntlProvider locale="en">
        <MemoryRouter>
          <CartSidebar
            items={ITEMS}
            removeItem={removeItem}
            updateItem={updateItem}
            totalPrice={TOTAL_PRICE}
            subtotalPrice={SUBTOTAL_PRICE}
            show
            hide={hide}
            continueShopping={continueShopping}
            goToCart={goToCart}
            proceedToCheckout={proceedToCheckout}
            target={portalRoot}
          />
        </MemoryRouter>
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display products", () => {
    const hide = jest.fn();
    const removeItem = jest.fn();
    const updateItem = jest.fn();
    const continueShopping = jest.fn();
    const goToCart = jest.fn();
    const proceedToCheckout = jest.fn();

    const wrapper = mount(
      <IntlProvider locale="en">
        <MemoryRouter>
          <CartSidebar
            items={ITEMS}
            removeItem={removeItem}
            updateItem={updateItem}
            totalPrice={TOTAL_PRICE}
            subtotalPrice={SUBTOTAL_PRICE}
            show
            hide={hide}
            continueShopping={continueShopping}
            goToCart={goToCart}
            proceedToCheckout={proceedToCheckout}
            target={portalRoot}
          />
        </MemoryRouter>
      </IntlProvider>
    );

    wrapper.find(CartRow).forEach((wrapper, idx) => {
      const item = ITEMS[idx];
      expect(wrapper.text()).toContain(item.variant.name);
      expect(wrapper.text()).toContain(
        item.variant.pricing?.price?.gross.amount
      );
      expect(wrapper.text()).toContain(
        item.quantity * (item.variant.pricing?.price?.gross.amount || 0)
      );
    });
  });

  it("should display cost summary", () => {
    const hide = jest.fn();
    const removeItem = jest.fn();
    const updateItem = jest.fn();
    const continueShopping = jest.fn();
    const goToCart = jest.fn();
    const proceedToCheckout = jest.fn();

    const wrapper = mount(
      <IntlProvider locale="en">
        <MemoryRouter>
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
            goToCart={goToCart}
            proceedToCheckout={proceedToCheckout}
            target={portalRoot}
          />
        </MemoryRouter>
      </IntlProvider>
    );

    expect(wrapper.find(CartSummaryCosts).text()).toContain(
      TOTAL_PRICE.gross.amount
    );
    expect(wrapper.find(CartSummaryCosts).text()).toContain(
      SUBTOTAL_PRICE.gross.amount
    );
    expect(wrapper.find(CartSummaryCosts).text()).toContain(
      SHIPPING_PRICE.gross.amount
    );
    expect(wrapper.find(CartSummaryCosts).text()).toContain(
      PROMO_PRICE.gross.amount
    );
  });

  it("should call mocks when clicking on continue shopping button", () => {
    const hide = jest.fn();
    const removeItem = jest.fn();
    const updateItem = jest.fn();
    const continueShopping = jest.fn();
    const goToCart = jest.fn();
    const proceedToCheckout = jest.fn();

    const wrapper = mount(
      <IntlProvider locale="en">
        <MemoryRouter>
          <CartSidebar
            items={[]}
            removeItem={removeItem}
            updateItem={updateItem}
            totalPrice={TOTAL_PRICE}
            subtotalPrice={SUBTOTAL_PRICE}
            show
            hide={hide}
            continueShopping={continueShopping}
            goToCart={goToCart}
            proceedToCheckout={proceedToCheckout}
            target={portalRoot}
          />
        </MemoryRouter>
      </IntlProvider>
    );

    wrapper
      .find("button")
      .findWhere(wrapper => wrapper.props().name === "continueShopping")
      .simulate("click");

    expect(continueShopping).toHaveBeenCalled();
  });

  it("should call mocks when clicking on go to cart button", () => {
    const hide = jest.fn();
    const removeItem = jest.fn();
    const updateItem = jest.fn();
    const continueShopping = jest.fn();
    const goToCart = jest.fn();
    const proceedToCheckout = jest.fn();

    const wrapper = mount(
      <IntlProvider locale="en">
        <MemoryRouter>
          <CartSidebar
            items={ITEMS}
            removeItem={removeItem}
            updateItem={updateItem}
            show
            hide={hide}
            continueShopping={continueShopping}
            goToCart={goToCart}
            proceedToCheckout={proceedToCheckout}
            target={portalRoot}
          />
        </MemoryRouter>
      </IntlProvider>
    );

    wrapper
      .find("button")
      .findWhere(wrapper => wrapper.props().name === "gotoBagView")
      .simulate("click");

    expect(goToCart).toHaveBeenCalled();
  });

  it("should call mocks when clicking on proceed to checkout button", () => {
    const hide = jest.fn();
    const removeItem = jest.fn();
    const updateItem = jest.fn();
    const continueShopping = jest.fn();
    const goToCart = jest.fn();
    const proceedToCheckout = jest.fn();

    const wrapper = mount(
      <IntlProvider locale="en">
        <MemoryRouter>
          <CartSidebar
            items={ITEMS}
            removeItem={removeItem}
            updateItem={updateItem}
            show
            hide={hide}
            continueShopping={continueShopping}
            goToCart={goToCart}
            proceedToCheckout={proceedToCheckout}
            target={portalRoot}
          />
        </MemoryRouter>
      </IntlProvider>
    );

    wrapper
      .find("button")
      .findWhere(wrapper => wrapper.props().name === "gotoCheckout")
      .simulate("click");

    expect(proceedToCheckout).toHaveBeenCalled();
  });
});
