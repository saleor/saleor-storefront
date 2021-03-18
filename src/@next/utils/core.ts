import type { IItems } from "@saleor/sdk/lib/api/Cart/types";

export const slugify = (text: string | number): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const checkIfShippingRequiredForProducts = (items?: IItems) =>
  items?.some(({ variant }) => variant.product?.productType.isShippingRequired);
