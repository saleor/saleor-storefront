export interface ITaxedMoney {
  net: {
    amount: number;
    currency: string;
  };
  gross: {
    amount: number;
    currency: string;
  };
}
