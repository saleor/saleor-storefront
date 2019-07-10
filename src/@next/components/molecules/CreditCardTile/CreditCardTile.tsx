import React from "react";

import { IconButton, Tile } from "@components/atoms/";
import { CreditCardNumberWithIcon } from "../CreditCardNumberWithIcon";

import { Trans } from "@lingui/react";
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
      <S.BoldTitle>
        <Trans id="Expires on" />
      </S.BoldTitle>
      <S.TextContent>{expirationDate}</S.TextContent>
      <S.BoldTitle>
        <Trans id="Name on card" />
      </S.BoldTitle>
      <S.TextContent>{nameOnCard}</S.TextContent>
    </>
  );
  const footer = (
    <S.FooterContent>
      <div>
        <IconButton name="trash" onClick={onRemove} size={22} />
      </div>
    </S.FooterContent>
  );
  return (
    <Tile header={header} footer={footer}>
      {content}
    </Tile>
  );
};
