import { IFormError } from "@types";
import React from "react";

export interface CreditCardInputProps extends React.InputHTMLAttributes<any> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  label: string;
  values: Record<CreditCardField, string>;
  errors: IFormError[];
  setErrors: (errors: IFormError[]) => void;
  showEmptyErrors: boolean;
  setShowEmptyErrors: (show: boolean) => void;
}

export enum CreditCardField {
  cardNumber = "cardNumber",
  cvc = "cvc",
  expiryDate = "expiryDate",
}
