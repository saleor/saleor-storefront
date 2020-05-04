import { ProductList_products_edges_node } from "@sdk/queries/types/ProductList";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IProps {
  products: Array<PartialBy<ProductList_products_edges_node, "category">>;
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
}
