import React from "react";

import { IconButton, Tile } from "@components/atoms/";
import { CreditCardNumberWithIcon } from "@components/molecules/";

import * as S from "./styles";
import { IProps } from "./types";

export const CreditCardTile: React.FC<IProps> = ({
  nameOnCard,
  expirationDate,
  onRemove,
  onEdit,
  ...props
}: IProps) => {
  const header = <CreditCardNumberWithIcon {...props} />;
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
        <IconButton name="edit" onClick={onEdit} />
      </span>
      <span>
        <IconButton name="trash" onClick={onRemove} />
      </span>
    </>
  );
  return (
    <Tile header={header} footer={footer}>
      {content}
    </Tile>
  );
};
