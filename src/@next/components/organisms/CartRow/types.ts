import React from "react";

import { IImage } from "@types";

export type ICartRowType = "responsive" | "condense";

export interface IProps {
  /**
   * Item index
   */
  index?: number;
  /**
   * Id of the product
   */
  id: string;
  slug: string;
  /**
   * Price for single unit
   */
  unitPrice: React.ReactNode;
  /**
   * Price of single unit mupltiplied by quantity
   */
  totalPrice: React.ReactNode;
  /**
   * Name of the product
   */
  name: string;
  /**
   * Stock keeping unit
   */
  sku?: string;
  /**
   * Quantity of particular item
   */
  quantity: number;
  /**
   * Maximum possible quantity of particular item
   */
  maxQuantity: number;
  /**
   * Method run when removing item from cart
   */
  onRemove: () => void;
  /**
   * Method run while chaning product quantity
   */
  onQuantityChange: (value: number) => void;
  /**
   * Product thumbnail image
   */
  thumbnail?: IImage;
  /**
   * Variant attributes
   */
  attributes?: Array<{
    attribute: { id: string; name: string };
    values: Array<{ name: string }>;
  }>;
  /**
   * Visual row style
   */
  type?: ICartRowType;
}
