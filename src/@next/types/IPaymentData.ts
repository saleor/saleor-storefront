import { ICardData } from "./ICardData";

export interface IPaymentData {
  gateway: string;
  token?: string;
  cardData?: ICardData;
  data?: any;
}
