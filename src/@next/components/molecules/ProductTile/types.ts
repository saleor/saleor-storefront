import { ProductList_products_edges_node } from "@sdk/queries/gqlTypes/ProductList";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IProps {
  product: PartialBy<ProductList_products_edges_node, "category">;
}
