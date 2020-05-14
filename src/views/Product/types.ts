import { ProductDetails_product } from "@sdk/queries/types/ProductDetails";
import { ICheckoutModelLine } from "@sdk/repository";

export interface IProps {
  product: ProductDetails_product;
  add: (variantId: string, quantity: number) => any;
  items: ICheckoutModelLine[];
}
