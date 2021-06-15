import { IProps } from "./types";

export const DEFAULT_PROPS: Pick<
  IProps,
  "name" | "title" | "valuesShowLimit" | "values"
> = {
  name: "size",
  title: "Size",
  values: [
    {
      __typename: "AttributeValue",
      id: "2",
      name: "41",
      selected: true,
      slug: "41",
    },
    {
      __typename: "AttributeValue",
      id: "3",
      name: "42",
      slug: "42",
    },
    {
      __typename: "AttributeValue",
      id: "4",
      name: "43",
      slug: "43",
    },
    {
      __typename: "AttributeValue",
      id: "5",
      name: "44",
      slug: "44",
    },
    {
      __typename: "AttributeValue",
      id: "6",
      name: "45",
      slug: "45",
    },
    {
      __typename: "AttributeValue",
      id: "7",
      name: "46",
      slug: "46",
    },
  ],
  valuesShowLimit: true,
};
