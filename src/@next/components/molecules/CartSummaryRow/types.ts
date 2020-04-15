import { IImage, ITaxedMoney } from "@types";

export interface IProps {
  index?: number;
  name: string;
  sku: string;
  quantity: number;
  price: ITaxedMoney;
  thumbnail?: IImage;
}
