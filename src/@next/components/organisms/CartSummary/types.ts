import { ITaxedMoney } from "@types";
export interface ICostLine {
  name: string;
  cost: ITaxedMoney;
  last?: boolean;
}

export interface ICosts {
  subtotal?: ITaxedMoney;
  promoCode?: ITaxedMoney;
  shipping?: ITaxedMoney;
  total?: ITaxedMoney;
  products?: Array<{
    name: string;
    sku: string;
    quantity: number;
    price: ITaxedMoney;
  }>;
}

export interface IProps extends ICosts {}
