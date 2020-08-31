import { ProductList_products_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";

export interface IProps {
  product: Partial<ProductList_products_edges_node>;
}
