import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
  StripeCardNumberElementOptions,
} from "@stripe/stripe-js";
import React, { ChangeEvent } from "react";

export interface IProps
  extends Omit<
    React.InputHTMLAttributes<any>,
    "onChange" | "onFocus" | "onBlur"
  > {
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (
    event:
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent
      | ChangeEvent<HTMLInputElement>
  ) => any;
  error?: boolean;
  label?: string;
  type: "CardNumber" | "CardExpiry" | "CardCvc";
  options?: StripeCardNumberElementOptions;
}
