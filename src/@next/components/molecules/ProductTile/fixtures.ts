import { ProductList_products_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";

export const PRODUCT: ProductList_products_edges_node = {
  __typename: "Product",
  id: "UHJvZHVjdDo3Mg==",
  name: "Apple Juice",
  slug: "apple-juice",
  seoDescription: "Apple Juice Description",
  seoTitle: "Apple Juice",
  pricing: {
    __typename: "ProductPricingInfo",
    onSale: true,
    priceRange: {
      __typename: "TaxedMoneyRange",
      start: {
        __typename: "TaxedMoney",
        gross: {
          __typename: "Money",
          amount: 1.8,
          currency: "USD",
        },
        net: {
          __typename: "Money",
          amount: 1.8,
          currency: "USD",
        },
      },
      stop: {
        __typename: "TaxedMoney",
        gross: {
          __typename: "Money",
          amount: 4.2,
          currency: "USD",
        },
        net: {
          __typename: "Money",
          amount: 4.2,
          currency: "USD",
        },
      },
    },
    priceRangeUndiscounted: {
      __typename: "TaxedMoneyRange",
      start: {
        __typename: "TaxedMoney",
        gross: {
          __typename: "Money",
          amount: 3,
          currency: "USD",
        },
        net: {
          __typename: "Money",
          amount: 3,
          currency: "USD",
        },
      },
      stop: {
        __typename: "TaxedMoney",
        gross: {
          __typename: "Money",
          amount: 7,
          currency: "USD",
        },
        net: {
          __typename: "Money",
          amount: 7,
          currency: "USD",
        },
      },
    },
  },
  thumbnail: {
    __typename: "Image",
    alt: "",
    url:
      "http://localhost:8000/media/__sized__/products/saleordemoproduct_fd_juice_06_102xcfi-thumbnail-255x255.png",
  },
  thumbnail2x: {
    __typename: "Image",
    url:
      "http://localhost:8000/media/__sized__/products/saleordemoproduct_fd_juice_06_102xcfi-thumbnail-510x510.png",
  },
};
