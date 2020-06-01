import React from "react";

import { Money } from "../Money";
import { IProps } from "./types";

import { ShopContext } from "../../../../components/ShopProvider/context";

export const TaxedMoney: React.FC<IProps> = ({
  taxedMoney,
  defaultValue,
  ...props
}: IProps) => {
  const { displayGrossPrices } = React.useContext(ShopContext);
  const money = taxedMoney
    ? displayGrossPrices
      ? taxedMoney.gross
      : taxedMoney.net
    : undefined;
  return <Money {...props} money={money} defaultValue={defaultValue} />;
};

TaxedMoney.displayName = "TaxedMoney";
export default TaxedMoney;
