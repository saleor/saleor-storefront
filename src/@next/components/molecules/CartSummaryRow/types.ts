import { ITaxedMoney, IImage } from "@types";

export interface IProps {
  name: string;
  sku: string;
  quantity: number;
  price: ITaxedMoney;
  thumbnail?: IImage;
}
