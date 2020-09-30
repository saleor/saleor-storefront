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

  it("should display products with their prices", () => {
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
      const cartRow = wrapper.text();
      expect(cartRow).toContain(item.variant.name);
      expect(cartRow).toContain(item.variant.pricing?.price?.gross.amount);
      expect(cartRow).toContain(
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

    const cartSummary = wrapper.find(CartSummaryCosts).text();

    expect(cartSummary).toContain(TOTAL_PRICE.gross.amount);
    expect(cartSummary).toContain(SUBTOTAL_PRICE.gross.amount);
    expect(cartSummary).toContain(SHIPPING_PRICE.gross.amount);
    expect(cartSummary).toContain(PROMO_PRICE.gross.amount);
  });

  it("should call mock when clicking on continue shopping button", () => {
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

  it("should call mock when clicking on go to cart button", () => {
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

  it("should call mock when clicking on proceed to checkout button", () => {
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
