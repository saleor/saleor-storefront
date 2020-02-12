import React from "react";
import { IProps } from "./types";

export const Money: React.FC<IProps> = ({ money, defaultValue }: IProps) => {
  if (!money) {
    return <span>{defaultValue}</span>;
  }
  return (
    <span>
      {money.amount.toLocaleString(undefined, {
        currency: money.currency,
        style: "currency",
      })}
    </span>
  );
};

Money.displayName = "Money";
export default Money;
