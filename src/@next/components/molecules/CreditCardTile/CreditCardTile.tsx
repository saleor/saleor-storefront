import React from "react";

import { IconButton, Tile } from "@components/atoms/";
import { CreditCardNumberWithIcon } from "../CreditCardNumberWithIcon";

import * as S from "./styles";
import { IProps } from "./types";

export const CreditCardTile: React.FC<IProps> = ({
  nameOnCard,
  expirationDate,
  onRemove,
  last4Digits,
  creditCardProvider,
}: IProps) => {
  const header = (
    <CreditCardNumberWithIcon
      last4Digits={last4Digits}
      creditCardProvider={creditCardProvider}
    />
  );
  const content = (
    <>
      <S.BoldTitle>Expires on</S.BoldTitle>
      <S.TextContent data-test="expirationDate">{expirationDate}</S.TextContent>
      <S.BoldTitle>Name on card</S.BoldTitle>
      <S.TextContent data-test="nameOnCard">{nameOnCard}</S.TextContent>
    </>
  );
  const footer = (
    <S.FooterContent>
      <div>
        <IconButton
          name="trash"
          onClick={onRemove}
          size={22}
          testingContext="removeCardButton"
        />
      </div>
    </S.FooterContent>
  );
  return (
    <Tile
      header={header}
      footer={footer}
      data-test="creditCardTile"
      data-test-id={last4Digits}
    >
      {content}
    </Tile>
  );
};
