import productImage from "./productImage.png";

const money = {
  gross: {
    amount: 123,
    currency: "PLN",
  },
  net: {
    amount: 100,
    currency: "PLN",
  },
};

const product = {
  name: "The Great Square Table",
  quanity: 2,
  sku: "TGS-122A",
  price: money,
  thumbnail: {
    url: productImage,
    alt: "product image",
  },
};

export const DEFAULT_PROPS = {
  products: [product, product, product],
  promoCode: money,
  shipping: money,
  subtotal: money,
  total: money,
};
