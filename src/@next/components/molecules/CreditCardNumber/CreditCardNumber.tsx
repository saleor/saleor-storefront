import React from "react";

import { CreditCardIcon } from "@components/atoms";

import { IProps } from "./types";

export const CreditCardNumber: React.FC<IProps> = ({
  provider,
  last4Digits,
}) => {
  return (
    <div>
      <CreditCardIcon provider={provider} /> XXXX XXXX XXXX {last4Digits}
    </div>
  );
};
