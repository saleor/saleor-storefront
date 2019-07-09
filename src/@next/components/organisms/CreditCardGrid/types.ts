import { CCProviders } from "@components/atoms";

declare type ccData = {
  nameOnCard: string;
  expirationDate: string;
  last4Digits: number;
  creditCardProvider: CCProviders;
};

export interface IProps {
  creditCards: ccData[];
}
