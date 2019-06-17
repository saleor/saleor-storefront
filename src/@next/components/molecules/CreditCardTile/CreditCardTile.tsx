import React from "react";

import { Tile } from "@components/atoms/";
import { CreditCardNumberWithIcon } from "@components/molecules/";
import { IProps } from "./types";

export const CreditCardTile: React.FC<IProps> = ({
  nameOnCard,
  expirationDate,
}: IProps) => {
  return (
    <Tile
      header={<CreditCardNumberWithIcon provider="visa" last4Digits={1234} />}
    >
      <>
        <p>Expires on</p>
        <p>{expirationDate}</p>
        <p>Name on Card</p>
        <p>{nameOnCard}</p>
      </>
    </Tile>
  );
};
