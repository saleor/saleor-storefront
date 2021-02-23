import type { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { Base64 } from "js-base64";
import { stringify } from "query-string";

import { UknownObject } from "./tsUtils";

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

export const checkIfShippingRequiredForProducts = (items?: IItems) =>
  items?.some(({ variant }) => variant.product?.productType.isShippingRequired);

export const generatePath = (
  path: string,
  params: UknownObject = {},
  traillingSlash = true
) => {
  const used = new Set();

  const appendTraillingSlash = (path: string) =>
    path?.endsWith("/") ? path : `${path}/`;

  // Replace the parts in [xxx]
  path = path.replace(/\[([^\]]+)]/g, (m, c0) => {
    used.add(c0);
    return c0 in params ? params[c0] : "";
  });

  const queryString = (() => {
    const queryParams = Object.entries(params).filter(
      ([key]) => !used.has(key)
    );
    const queryObject = queryParams.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {} as UknownObject);

    return queryParams.length ? `?${stringify(queryObject)}` : "";
  })();

  return `${traillingSlash ? appendTraillingSlash(path) : path}${queryString}`;
};
