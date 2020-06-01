import productImage from "./productImage.png";

export const DEFAULT_PROPS = {
  name: "The Great Square Table",
  price: {
    gross: {
      amount: 123,
      currency: "PLN",
    },
    net: {
      amount: 100,
      currency: "PLN",
    },
  },
  quantity: 2,
  sku: "TGS-122A",
  thumbnail: {
    alt: "Product image",
    url: productImage,
  },
};
