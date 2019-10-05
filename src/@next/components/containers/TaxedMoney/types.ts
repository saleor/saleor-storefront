export interface IProps {
  taxedMoney?: {
    net: {
      amount: number;
      currency: string;
    };
    gross: {
      amount: number;
      currency: string;
    };
  };
  defaultValue?: string;
}
