import { IImage } from "@types";

export interface IProps {
  unitPrice: string;
  totalPrice: string;
  name: string;
  sku?: string;
  quantity: number;
  onRemove: () => void;
  onAdd: () => void;
  onSubstract: () => void;
  thumbnail?: IImage;
  attributes: Array<{
    name: string;
    values: Array<{ value: string }>;
  }>;
}
