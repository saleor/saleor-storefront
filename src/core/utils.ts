import { Base64 } from "js-base64";
import { PriceInterface } from "./types";

export const slugify = (text: string | number): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const getDBIdFromGraphqlId = (
  graphqlId: string,
  schema?: string
): number => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)/;
  const [, expectedSchema, id] = regexp.exec(rawId);
  if (schema && schema !== expectedSchema) {
    throw new Error("Schema is not correct");
  }
  return parseInt(id, 10);
};

export const getGraphqlIdFromDBId = (id: string, schema: string): string =>
  // This is temporary solution, we will use slugs in the future
  Base64.encode(`${schema}:${id}`);

export const priceToString = (
  price: { amount: number; currency: string },
  locale?: string
): string => {
  const { amount } = price;
  if (locale) {
    return amount.toLocaleString(locale, {
      currency: price.currency,
      style: "currency"
    });
  } else {
    return `${price.currency} ${amount.toFixed(2)}`;
  }
};

export const generateProductUrl = (id: string, name: string) =>
  `/product/${slugify(name)}/${getDBIdFromGraphqlId(id, "Product")}/`;

export const generateCategoryUrl = (id: string, name: string) =>
  `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generatePageUrl = (slug: string) => `/page/${slug}/`;

interface AttributeDict {
  [attributeSlug: string]: string[];
}
export const convertToAttributeScalar = (attributes: AttributeDict) =>
  Object.entries(attributes)
    .map(
      ([key, value]) =>
        typeof value === "string"
          ? key + ":" + value
          : value.map(attribute => key + ":" + attribute)
    )
    .reduce(
      (prev, curr) =>
        typeof curr === "string" ? [...prev, curr] : [...prev, ...curr],
      []
    );

interface QueryString {
  [key: string]: string[] | string | null | undefined;
}
export const getAttributesFromQs = (qs: QueryString) =>
  Object.keys(qs)
    .filter(
      key => !["pageSize", "priceGte", "priceLte", "sortBy", "q"].includes(key)
    )
    .reduce((prev, curr) => {
      prev[curr] = typeof qs[curr] === "string" ? [qs[curr]] : qs[curr];
      return prev;
    }, {});
