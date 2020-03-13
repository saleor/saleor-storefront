import productImage from "./productImage.png";

export const DEFAULT_PROPS = {
  thumbnail: {
    url: productImage,
    alt: "Product image",
  },
  name: "The Great Square Table",
  sku: "TGS-122A",
  quantity: 2,
  price: {
    net: {
      amount: 100,
      currency: "PLN",
    },
    gross: {
      amount: 123,
      currency: "PLN",
    },
  },
};
