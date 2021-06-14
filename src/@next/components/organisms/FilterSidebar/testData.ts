import { IProps } from "./types";

export const DEFAULT_PROPS: Pick<IProps, "attributes" | "filters" | "show"> = {
  attributes: [
    {
      __typename: "Attribute",
      id: "1",
      name: "Size",
      slug: "size",
      choices: {
        __typename: "AttributeValueCountableConnection",
        edges: [
          {
            __typename: "AttributeValueCountableEdge",
            node: {
              __typename: "AttributeValue",
              id: "2",
              name: "41",
              slug: "41",
            },
          },
          {
            __typename: "AttributeValueCountableEdge",
            node: {
              __typename: "AttributeValue",
              id: "3",
              name: "42",
              slug: "42",
            },
          },
          {
            __typename: "AttributeValueCountableEdge",
            node: {
              __typename: "AttributeValue",
              id: "4",
              name: "43",
              slug: "43",
            },
          },
          {
            __typename: "AttributeValueCountableEdge",
            node: {
              __typename: "AttributeValue",
              id: "5",
              name: "44",
              slug: "44",
            },
          },
          {
            __typename: "AttributeValueCountableEdge",
            node: {
              __typename: "AttributeValue",
              id: "6",
              name: "45",
              slug: "45",
            },
          },
          {
            __typename: "AttributeValueCountableEdge",
            node: {
              __typename: "AttributeValue",
              id: "7",
              name: "46",
              slug: "46",
            },
          },
        ],
      },
    },
  ],
  filters: {
    attributes: {
      size: ["41"],
    },
    pageSize: 5,
    priceGte: 0,
    priceLte: 0,
    sortBy: "",
  },
  show: true,
};
