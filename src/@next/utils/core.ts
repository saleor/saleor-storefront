// Rework this functionality once slugs are in use
// @ts-ignore
import { Base64 } from "js-base64";

import { IItems } from "@saleor/sdk/lib/api/Cart/types";

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
  const [, expectedSchema, id] = regexp.exec(rawId)!;
  if (schema && schema !== expectedSchema) {
    throw new Error("Schema is not correct");
  }
  return parseInt(id, 10);
};

export const generateCategoryUrl = (id: string, name: string) =>
  `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generateCollectionUrl = (id: string, name: string) =>
  `/collection/${slugify(name)}/${getDBIdFromGraphqlId(id, "Collection")}/`;

export const generatePageUrl = (slug: string) => `/page/${slug}/`;

export const generateGuestOrderDetailsUrl = (token: string) =>
  `/order-history/${token}/`;

export const checkIfShippingRequiredForProducts = (items?: IItems) =>
  items?.some(({ variant }) => variant.product?.productType.isShippingRequired);
