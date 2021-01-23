import { ProductDetails } from "@saleor/sdk/lib/fragments/gqlTypes/ProductDetails";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";

export interface IProps {
  product: ProductDetails;
  add: (variantId: string, quantity: number) => any;
  items: ICheckoutModelLine[];
}
