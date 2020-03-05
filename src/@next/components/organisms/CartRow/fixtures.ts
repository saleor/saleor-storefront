import productImage from "./productImage.png";

export const DEFAULT_PROPS = {
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
    {
      name: "Armrest",
      values: [
        {
          value: "None",
        },
      ],
    },
  ],
  name: "The Great Square Table",
  quantity: 3,
  sku: "R4ND-0M-5KU",
  thumbnail: {
    alt: "product image",
    url: productImage,
  },
  totalPrice: "150$",
  unitPrice: "50$",
};
