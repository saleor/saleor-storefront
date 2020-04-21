import { IImage, ITaxedMoney } from "@types";
export interface ICostLine {
  name: string;
  cost: ITaxedMoney;
  last?: boolean;
  negative?: boolean;
}

export interface ICosts {
  subtotal?: ITaxedMoney | null;
  promoCode?: ITaxedMoney | null;
  shipping?: ITaxedMoney | null;
  total?: ITaxedMoney | null;
}

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  sku: string;
  price: ITaxedMoney;
  thumbnail: IImage;
}

export interface IProps extends ICosts {
  products?: IProduct[];
}
