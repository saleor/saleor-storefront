import { ProductOrder } from "@saleor/sdk";
import { FetchResult } from "apollo-link";

import { channelSlug } from "@temp/constants";

import {
  AttributeInput,
  OrderDirection,
  ProductOrderField,
} from "../../gqlTypes/globalTypes";
import { IFilterAttributes } from "../@next/types";
import { FormError } from "./types";

export const slugify = (text: string | number): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const priceToString = (
  price: { amount: number; currency: string },
  locale?: string
): string => {
  const { amount } = price;
  if (locale) {
    return amount.toLocaleString(locale, {
      currency: price.currency,
      style: "currency",
    });
  }
  return `${price.currency} ${amount.toFixed(2)}`;
};

interface AttributeDict {
  [attributeSlug: string]: string[];
}
export const convertToAttributeScalar = (
  attributes: AttributeDict | IFilterAttributes
): AttributeInput[] =>
  Object.entries(attributes)
    .map(([key, value]) =>
      value.map((attribute: any) => ({ slug: key, values: [attribute] }))
    )
    .reduce((prev, curr) => [...prev, ...curr], []);

interface QueryString {
  [key: string]: string[] | string | null | undefined;
}
export const getAttributesFromQs = (qs: QueryString) =>
  Object.keys(qs)
    .filter(
      key => !["pageSize", "priceGte", "priceLte", "sortBy", "q"].includes(key)
    )
    .reduce((prev: any, curr: any) => {
      prev[curr] = typeof qs[curr] === "string" ? [qs[curr]] : qs[curr];
      return prev;
    }, {});

export const getValueOrEmpty = <T>(value: T): T | string =>
  value === undefined || value === null ? "" : value;

export const convertSortByFromString = (
  sortBy: string,
  channel = channelSlug
): ProductOrder | null => {
  if (!sortBy) {
    return null;
  }

  const direction = sortBy.startsWith("-")
    ? OrderDirection.DESC
    : OrderDirection.ASC;

  let field;

  switch (sortBy.replace(/^-/, "")) {
    case "name":
      field = ProductOrderField.NAME;
      break;

    case "price":
      field = ProductOrderField.MINIMAL_PRICE;
      break;

    case "updated_at":
      field = ProductOrderField.DATE;
      break;

    default:
      return null;
  }
  return { field, direction, channel };
};

export const maybe = <T>(exp: () => T, d?: T) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const findFormErrors = (result: void | FetchResult): FormError[] => {
  if (result) {
    const data = Object.values(maybe(() => result.data) as object);

    return data.reduce((prevVal: any, currVal: any) => {
      const errors = currVal.errors || [];

      return [...prevVal, ...errors];
    }, []);
  }
  return [];
};

export const removeEmptySpaces = (text: string) => text.replace(/\s+/g, "");
