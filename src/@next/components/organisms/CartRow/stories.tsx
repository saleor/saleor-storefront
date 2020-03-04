import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { CartRow } from ".";
import productImage from "./productImage.png";

const DEFAULT_PROPS = {
  onRemove: action("onRemove has been called"),
  onQuantityChange: action("onQuantityChange has been called"),
  name: "The Great Square Table",
  sku: "R4ND-0M-5KU",
  unitPrice: "50$",
  totalPrice: "150$",
  quantity: 3,
  thumbnail: {
    url: productImage,
    alt: "product image",
  },
  attributes: [
    {
      name: "Color",
      values: [
        {
          value: "Yellow",
        },
      ],
    },
    {
      name: "Size",
      values: [
        {
          value: "Large",
        },
      ],
    },
    {
      name: "Legs",
      values: [
        {
          value: "Square",
        },
      ],
    },
    // {
    //   name: "Armrest",
    //   values: [
    //     {
    //       value: "None",
    //     },
    //   ],
    // },
    // {
    //   name: "Legs",
    //   values: [
    //     {
    //       value: "Square",
    //     },
    //   ],
    // },
    // {
    //   name: "Armrest",
    //   values: [
    //     {
    //       value: "None",
    //     },
    //   ],
    // },
  ],
};

storiesOf("@components/organisms/CartRow", module)
  .addParameters({ component: CartRow })
  .add("default", () => <CartRow {...DEFAULT_PROPS} />);
