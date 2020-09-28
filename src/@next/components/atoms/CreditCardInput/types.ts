import React from "react";

export interface IProps extends React.InputHTMLAttributes<any> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  values: {
    cardNumber: string;
    cvc: string;
    expirationDate: string;
  };
}
