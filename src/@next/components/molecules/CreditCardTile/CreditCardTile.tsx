import React from "react";

import { ImageButton, Tile } from "@components/atoms/";
import { CreditCardNumberWithIcon } from "@components/molecules/";

import * as S from "./styles";
import { IProps } from "./types";

export const CreditCardTile: React.FC<IProps> = ({
  nameOnCard,
  expirationDate,
}: IProps) => {
  const header = (
    <CreditCardNumberWithIcon provider="visa" last4Digits={1234} />
  );
  const content = (
    <>
      <S.BoldTitle>Expires on</S.BoldTitle>
      <S.TextContent>{expirationDate}</S.TextContent>
      <S.BoldTitle>Name on card</S.BoldTitle>
      <S.TextContent>{nameOnCard}</S.TextContent>
    </>
  );
  const footer = (
    <>
      <span>
        <ImageButton type="edit" />
      </span>
      <span>
        <ImageButton type="trash" />
      </span>
    </>
  );
  return (
    <Tile header={header} footer={footer}>
      {content}
    </Tile>
  );
};
