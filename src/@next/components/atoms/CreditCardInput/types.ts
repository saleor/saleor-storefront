import React from "react";

export interface CreditCardInputProps extends React.InputHTMLAttributes<any> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  label: string;
  values: {
    cardNumber: string;
    cvc: string;
    expirationDate: string;
  };
}
