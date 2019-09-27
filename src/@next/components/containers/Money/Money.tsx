import React from "react";

import { I18nContext } from "..";
import { IProps } from "./types";

export const Money: React.StatelessComponent<IProps> = ({
  money,
  defaultValue,
}) => (
  <I18nContext.Consumer>
    {({ language }) => {
      if (!money) {
        return defaultValue;
      }
      return money.amount.toLocaleString(language, {
        currency: money.currency,
        style: "currency",
      });
    }}
  </I18nContext.Consumer>
);

Money.displayName = "Money";
export default Money;
