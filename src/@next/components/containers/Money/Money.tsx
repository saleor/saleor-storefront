import React from "react";
import { IProps } from "./types";

export const Money: React.FC<IProps> = ({
  money,
  defaultValue,
  ...props
}: IProps) => {
  if (!money) {
    return <span {...props}>{defaultValue}</span>;
  }
  return (
    <span {...props}>
      {money.currency && money.currency !== ""
        ? money.amount.toLocaleString(undefined, {
            currency: money.currency,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            style: "currency",
          })
        : money.amount.toString()}
    </span>
  );
};

Money.displayName = "Money";
export default Money;
