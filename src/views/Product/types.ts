import { ICheckoutModelLine } from "@sdk/repository";
import { ProductDetails_product } from "./types/ProductDetails";

export interface IProps {
  product: ProductDetails_product;
  add: (variantId: string, quantity: number) => any;
  items: ICheckoutModelLine[];
}
