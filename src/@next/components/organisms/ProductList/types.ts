import { ProductList_products_edges_node } from "@sdk/queries/types/ProductList";

export interface IProps {
  products: ProductList_products_edges_node[];
  totalCount: number;
}
