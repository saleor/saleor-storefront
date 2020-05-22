/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrdersByUser
// ====================================================

export interface OrdersByUser_me_orders_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface OrdersByUser_me_orders_edges_node_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrdersByUser_me_orders_edges_node_total_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrdersByUser_me_orders_edges_node_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrdersByUser_me_orders_edges_node_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrdersByUser_me_orders_edges_node_total_net;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant_product {
  __typename: "Product";
  name: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface OrdersByUser_me_orders_edges_node_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  product: OrdersByUser_me_orders_edges_node_lines_variant_product;
}

export interface OrdersByUser_me_orders_edges_node_lines_thumbnail {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrdersByUser_me_orders_edges_node_lines_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrdersByUser_me_orders_edges_node_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: OrdersByUser_me_orders_edges_node_lines_variant | null;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrdersByUser_me_orders_edges_node_lines_thumbnail | null;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail2x: OrdersByUser_me_orders_edges_node_lines_thumbnail2x | null;
}

export interface OrdersByUser_me_orders_edges_node {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  token: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * User-friendly order status.
   */
  statusDisplay: string | null;
  created: any;
  /**
   * Total amount of the order.
   */
  total: OrdersByUser_me_orders_edges_node_total | null;
  /**
   * List of order lines.
   */
  lines: (OrdersByUser_me_orders_edges_node_lines | null)[];
}

export interface OrdersByUser_me_orders_edges {
  __typename: "OrderCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: OrdersByUser_me_orders_edges_node;
}

export interface OrdersByUser_me_orders {
  __typename: "OrderCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: OrdersByUser_me_orders_pageInfo;
  edges: OrdersByUser_me_orders_edges[];
}

export interface OrdersByUser_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of user's orders.
   */
  orders: OrdersByUser_me_orders | null;
}

export interface OrdersByUser {
  /**
   * Return the currently authenticated user.
   */
  me: OrdersByUser_me | null;
}

export interface OrdersByUserVariables {
  perPage: number;
  after?: string | null;
}
