import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";

import { ProductDetails_product } from "./gqlTypes/ProductDetails";

export interface IProps {
  product: ProductDetails_product;
  add: (variantId: string, quantity: number) => any;
  items: ICheckoutModelLine[];
}
