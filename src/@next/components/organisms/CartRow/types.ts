import { IImage } from "@types";
import React from "react";

export interface IProps {
  unitPrice: React.ReactNode;
  totalPrice: React.ReactNode;
  name: string;
  sku?: string;
  processing?: boolean;
  quantity: number;
  onRemove: () => void;
  onAdd: () => void;
  onSubstract: () => void;
  thumbnail?: IImage;
  attributes?: Array<{
    attribute: { name: string };
    values: Array<{ name: string }>;
  }>;
}
