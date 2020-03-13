import React from "react";

import { CachedImage } from "..";
import { TaxedMoney } from "@components/containers";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const CartSummaryRow: React.FC<IProps> = ({
  sku,
  name,
  price,
  quantity,
  thumbnail,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Photo>
        <CachedImage {...thumbnail} />
      </S.Photo>
      <S.Name>{name}</S.Name>
      <S.Sku>SKU: {sku}</S.Sku>
      <S.Quantity>Quantity: {quantity}</S.Quantity>
      <S.Price>
        <TaxedMoney taxedMoney={price} />
      </S.Price>
    </S.Wrapper>
  );
};

export { CartSummaryRow };
