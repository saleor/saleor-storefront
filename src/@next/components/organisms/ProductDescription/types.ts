import {
  ProductDetails_product_attributes,
  ProductDetails_product_variants,
} from "@sdk/queries/types/ProductDetails";

export interface IProps {
  productVariants: ProductDetails_product_variants[];
  selectedAttributes: ProductDetails_product_attributes[];
  name: string;
  children: React.ReactNode;
  addToCart(varinatId: string, quantity?: number): void;
}
