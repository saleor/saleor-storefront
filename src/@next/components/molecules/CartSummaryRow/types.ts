import { IImage, ITaxedMoney } from "@types";

export interface IProps {
  name: string;
  sku: string;
  quantity: number;
  price: ITaxedMoney;
  thumbnail?: IImage;
}
