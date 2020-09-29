import React from "react";

export interface CreditCardInputProps extends React.InputHTMLAttributes<any> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  label: string;
  values: Record<CreditCardField, string>;
}

export enum CreditCardField {
  cardNumber = "cardNumber",
  cvc = "cvc",
  expiryDate = "expiryDate",
}
