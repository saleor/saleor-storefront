import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import AddToCartSection, { IAddToCartSection } from "./AddToCartSection";

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
  queryAttributes: {},
  setVariantId: variantId => undefined,
  variantId: "",
  onAddToCart: (variantId, quantity) => undefined,
  onAttributeChangeHandler: (slug, value) => undefined,
  availableForPurchase: null,
  isAvailableForPurchase: null,
};

storiesOf("@components/organisms/AddToCartSection", module).add(
  "default",
  () => (
    <IntlProvider locale="en">
      <AddToCartSection {...DEFAULT_PROPS} />
    </IntlProvider>
  )
);
