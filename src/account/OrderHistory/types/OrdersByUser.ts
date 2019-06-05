/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: OrdersByUser
// ====================================================

export interface OrdersByUser_orders_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface OrdersByUser_orders_edges_node_total_gross {
  __typename: "Money";
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface OrdersByUser_orders_edges_node_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrdersByUser_orders_edges_node_total_gross;
}

export interface OrdersByUser_orders_edges_node_lines_thumbnail {
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

export interface OrdersByUser_orders_edges_node_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrdersByUser_orders_edges_node_lines_thumbnail | null;
}

export interface OrdersByUser_orders_edges_node {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  status: OrderStatus;
  created: any;
  /**
   * Total amount of the order.
   */
  total: OrdersByUser_orders_edges_node_total | null;
  /**
   * List of order lines.
   */
  lines: (OrdersByUser_orders_edges_node_lines | null)[];
}

export interface OrdersByUser_orders_edges {
  __typename: "OrderCountableEdge";
  /**
   * The item at the end of the edge
   */
  node: OrdersByUser_orders_edges_node;
}

export interface OrdersByUser_orders {
  __typename: "OrderCountableConnection";
  pageInfo: OrdersByUser_orders_pageInfo;
  edges: OrdersByUser_orders_edges[];
}

export interface OrdersByUser {
  /**
   * List of the shop's orders.
   */
  orders: OrdersByUser_orders | null;
}
