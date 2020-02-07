import { ProductDetails_product_variants } from "@sdk/queries/types/ProductDetails";
import { ProductList_products_edges_node } from "@sdk/queries/types/ProductList";
import { Wishlist_me_wishlist_edges_node } from "@sdk/queries/types/Wishlist";

export interface TEMPishlistItem {
  __typename: string;
  id: string;
  product: ProductList_products_edges_node;
  variant: {
    __typename: string;
    id: string;
    name: string;
  };
}

export const WISHLIST: TEMPishlistItem[] = [
  {
    __typename: "WishlistItem",
    id: "V2lzaGxpc3RJdGVtOjYw",
    product: {
      __typename: "Product",
      category: {
        __typename: "Category",
        id: "Q2F0ZWdvcnk6MTQ=",
        name: "Juices",
      },
      id: "UHJvZHVjdDo2NA==",
      name: "Light Speed Yellow Paint",
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
    },
    variant: {
      __typename: "ProductVariant",
      id: "UHJvZHVjdFZhcmlhbnQ6MTgx",
      name: "2.5l",
    },
  },
  {
    __typename: "WishlistItem",
    id: "V2lzaGxpc3RJdGVtOjYy",
    product: {
      __typename: "Product",
      category: {
        __typename: "Category",
        id: "Q2F0ZWdvcnk6MTQ=",
        name: "Juices",
      },
      id: "UHJvZHVjdDo2NA==",
      name: "Light Speed Yellow Paint",
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
    },
    variant: {
      __typename: "ProductVariant",
      id: "UHJvZHVjdFZhcmlhbnQ6MTcx",
      name: "1l",
    },
  },
  {
    __typename: "WishlistItem",
    id: "G3TzaGxpc3RJdGVtABCD",
    product: {
      __typename: "Product",
      category: {
        __typename: "Category",
        id: "Q2F0ZWdvcnk6MTQ=",
        name: "Juices",
      },
      id: "UHJvZHVjdDo2NA==",
      name: "Light Speed Yellow Paint",
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
    },
    variant: {
      __typename: "ProductVariant",
      id: "UHJvZHVjdFZhcmlhbnQ6MTcz",
      name: "5l",
    },
  },
];
