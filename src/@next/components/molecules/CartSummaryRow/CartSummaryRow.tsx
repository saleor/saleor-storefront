import React from "react";

import { TaxedMoney } from "@components/containers";
import { CachedImage } from "../CachedImage";

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
      <S.Name>{name}</S.Name>
      <S.Sku>SKU: {sku}</S.Sku>
      <S.Quantity>Quantity: {quantity}</S.Quantity>
      <S.Price>
        <TaxedMoney taxedMoney={price} />
      </S.Price>
      <S.Photo>
        <CachedImage {...thumbnail} />
      </S.Photo>
    </S.Wrapper>
  );
};

export { CartSummaryRow };
