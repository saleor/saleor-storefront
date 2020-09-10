export interface IMoney {
  amount: number;
  currency: string;
}

export interface ITaxedMoney {
  net: IMoney;
  gross: IMoney;
}
