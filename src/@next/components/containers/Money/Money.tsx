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
      {money.amount.toLocaleString(undefined, {
        currency: money.currency,
        style: "currency",
      })}
    </span>
  );
};

Money.displayName = "Money";
export default Money;
