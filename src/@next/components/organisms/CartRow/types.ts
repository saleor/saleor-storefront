import { IImage } from "@types";
import React from "react";

export interface IProps {
  unitPrice: React.ReactNode;
  totalPrice: React.ReactNode;
  name: string;
  sku?: string;
  quantity: number;
  onRemove: () => void;
  onAdd: () => void;
  onSubstract: () => void;
  thumbnail?: IImage;
  attributes?: Array<{
    name: string;
    values: Array<{ value: string }>;
  }>;
}
