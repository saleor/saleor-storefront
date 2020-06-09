import { ProductList_products_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IProps {
  products: Array<PartialBy<ProductList_products_edges_node, "category">>;
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}
