import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { AddToCartSection } from ".";
import { IAddToCartSection } from "./AddToCartSection";

const DEFAULT_PROPS: IAddToCartSection = {
  productId: "42",
  productVariants: [],
  name: "Tribute",
  productPricing: {
    onSale: false,
    priceRangeUndiscounted: {
      start: {
        gross: { amount: 10, currency: "USD", __typename: "Money" },
        net: { amount: 10, currency: "USD", __typename: "Money" },
        __typename: "TaxedMoney",
      },
      stop: {
        gross: { amount: 15, currency: "USD", __typename: "Money" },
        net: { amount: 15, currency: "USD", __typename: "Money" },
        __typename: "TaxedMoney",
      },
      __typename: "TaxedMoneyRange",
    },
    priceRange: {
      start: {
        gross: { amount: 10, currency: "USD", __typename: "Money" },
        net: { amount: 10, currency: "USD", __typename: "Money" },
        __typename: "TaxedMoney",
      },
      stop: {
        gross: { amount: 15, currency: "USD", __typename: "Money" },
        net: { amount: 15, currency: "USD", __typename: "Money" },
        __typename: "TaxedMoney",
      },
      __typename: "TaxedMoneyRange",
    },
    __typename: "ProductPricingInfo",
  },
  items: [],
  queryAttributes: undefined,
  setVariantId: variantId => undefined,
  onAddToCart: (variantId, quantity) => undefined,
  onAttributeChangeHandler: (slug, value) => undefined,
};

storiesOf("@components/organisms/AddToCartSection", module)
  .addParameters({ component: AddToCartSection })
  .addDecorator(story => (
    <IntlProvider locale="en">
      <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
    </IntlProvider>
  ))
  .add("default", () => <AddToCartSection {...DEFAULT_PROPS} />);
