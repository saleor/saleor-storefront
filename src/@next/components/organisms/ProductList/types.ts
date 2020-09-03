import { ProductList_products_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";

export interface IProps {
  products: ProductList_products_edges_node[];
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}
