import {
  ICheckoutModelLine,
  ICheckoutModelLineVariant,
} from "@saleor/sdk/lib/helpers";

import { ITaxedMoney } from "@types";

import productImage from "./productImage.png";

const ITEM_VARIANT_UNIT_NET_PRICE = 10;
const ITEM_VARIANT_UNIT_GROSS_PRICE = 12.5;

const ITEM_TOTAL_PRICE = (quantity: number) => ({
  gross: {
    amount: ITEM_VARIANT_UNIT_GROSS_PRICE * quantity,
    currency: "PLN",
    __typename: "Money",
  },
  net: {
    amount: ITEM_VARIANT_UNIT_NET_PRICE * quantity,
    currency: "PLN",
    __typename: "Money",
  },
  __typename: "TaxedMoney",
});

const ITEM_VARIANT = (id: string): ICheckoutModelLineVariant => ({
  attributes: [
    {
      attribute: {
        id: "1",
        name: "Color",
        __typename: "Attribute",
      },
      values: [
        {
          name: "Yellow",
          id: "bfyufbefb",
          value: "yellow",
          __typename: "AttributeValue",
        },
      ],
      __typename: "SelectedAttribute",
    },
    {
      attribute: {
        id: "2",
        name: "Size",
        __typename: "Attribute",
      },
      values: [
        {
          name: "Large",
          id: "uichucnio",
          value: "large",
          __typename: "AttributeValue",
        },
      ],
      __typename: "SelectedAttribute",
    },
    {
      attribute: {
        id: "3",
        name: "Legs",
        __typename: "Attribute",
      },
      values: [
        {
          name: "Square",
          id: "iuhuhihii",
          value: "square",
          __typename: "AttributeValue",
        },
      ],
      __typename: "SelectedAttribute",
    },
    {
      attribute: {
        id: "4",
        name: "Armrest",
        __typename: "Attribute",
      },
      values: [
        {
          name: "None",
          id: "gygigigig",
          value: "none",
          __typename: "AttributeValue",
        },
      ],
      __typename: "SelectedAttribute",
    },
  ],
  quantityAvailable: 5,
  name: "The Great Square Table",
  sku: "R4ND-0M-5KU",
  id,
  product: {
    id: "UHJvZHVjdDo3Mg==",
    name: "The Great Square Table",
    slug: "the-great-square-table",
    productType: {
      id: `${id}-product-type`,
      isShippingRequired: true,
      __typename: "ProductType",
    },
    thumbnail: {
      alt: "product image",
      url: productImage,
      __typename: "Image",
    },
    thumbnail2x: {
      url: productImage,
      __typename: "Image",
    },
    __typename: "Product",
  },
  pricing: {
    price: {
      gross: {
        __typename: "Money",
        amount: ITEM_VARIANT_UNIT_GROSS_PRICE,
        currency: "PLN",
      },
      net: {
        __typename: "Money",
        amount: ITEM_VARIANT_UNIT_NET_PRICE,
        currency: "PLN",
      },
      __typename: "TaxedMoney",
    },
    onSale: false,
    priceUndiscounted: {
      gross: {
        __typename: "Money",
        amount: ITEM_VARIANT_UNIT_GROSS_PRICE,
        currency: "PLN",
      },
      net: {
        __typename: "Money",
        amount: ITEM_VARIANT_UNIT_NET_PRICE,
        currency: "PLN",
      },
      __typename: "TaxedMoney",
    },
    __typename: "VariantPricingInfo",
  },
});

export const ITEMS: ICheckoutModelLine[] = [
  {
    variant: ITEM_VARIANT("BYIUBubibyguybuy"),
    totalPrice: ITEM_TOTAL_PRICE(3),
    quantity: 3,
    id: "UHJvZHVjdDoz",
  },
  {
    variant: ITEM_VARIANT("Ibniyfsidbfibuib"),
    totalPrice: ITEM_TOTAL_PRICE(3),
    quantity: 3,
    id: "YFNUIgybuBUs",
  },
  {
    variant: ITEM_VARIANT("UHBXFDFfffytUYub"),
    totalPrice: ITEM_TOTAL_PRICE(3),
    quantity: 3,
    id: "JHBIbyubyBhk",
  },
];

export const SUBTOTAL_PRICE: ITaxedMoney = {
  gross: {
    amount: ITEM_VARIANT_UNIT_GROSS_PRICE * 3 * 3,
    currency: "PLN",
  },
  net: {
    amount: ITEM_VARIANT_UNIT_NET_PRICE * 3 * 3,
    currency: "PLN",
  },
};

export const SHIPPING_PRICE: ITaxedMoney = {
  gross: {
    amount: 30,
    currency: "PLN",
  },
  net: {
    amount: 20,
    currency: "PLN",
  },
};

export const PROMO_PRICE: ITaxedMoney = {
  gross: {
    amount: 15,
    currency: "PLN",
  },
  net: {
    amount: 10,
    currency: "PLN",
  },
};

export const TOTAL_PRICE: ITaxedMoney = {
  gross: {
    amount:
      SUBTOTAL_PRICE.gross.amount +
      SHIPPING_PRICE.gross.amount -
      PROMO_PRICE.gross.amount,
    currency: "PLN",
  },
  net: {
    amount:
      SUBTOTAL_PRICE.net.amount +
      SHIPPING_PRICE.net.amount -
      PROMO_PRICE.net.amount,
    currency: "PLN",
  },
};
