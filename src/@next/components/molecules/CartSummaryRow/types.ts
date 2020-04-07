import { IImage, ITaxedMoney } from "@types";

export interface IProps {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: ITaxedMoney;
  thumbnail?: IImage;
}
