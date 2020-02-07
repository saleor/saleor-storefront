import { Wishlist_me_wishlist_edges_node } from "@sdk/queries/types/Wishlist";

export const WISHLIST: Wishlist_me_wishlist_edges_node[] = [
  {
    __typename: "WishlistItem",
    id: "V2lzaGxpc3RJdGVtOjYw",
    product: {
      __typename: "Product",
      id: "UHJvZHVjdDo2NA==",
      name: "Light Speed Yellow Paint",
    },
    variants: {
      __typename: "ProductVariantCountableConnection",
      edges: [
        {
          __typename: "ProductVariantCountableEdge",
          node: {
            __typename: "ProductVariant",
            id: "UHJvZHVjdFZhcmlhbnQ6MTgx",
            name: "2.5l",
          },
        },
      ],
    },
  },
  {
    __typename: "WishlistItem",
    id: "V2lzaGxpc3RJdGVtOjYy",
    product: {
      __typename: "Product",
      id: "UHJvZHVjdDo2MQ==",
      name: "Nebula Night Sky Paint",
    },
    variants: {
      __typename: "ProductVariantCountableConnection",
      edges: [
        {
          __typename: "ProductVariantCountableEdge",
          node: {
            __typename: "ProductVariant",
            id: "UHJvZHVjdFZhcmlhbnQ6MTcx",
            name: "1l",
          },
        },
        {
          __typename: "ProductVariantCountableEdge",
          node: {
            __typename: "ProductVariant",
            id: "UHJvZHVjdFZhcmlhbnQ6MTcz",
            name: "5l",
          },
        },
      ],
    },
  },
];
