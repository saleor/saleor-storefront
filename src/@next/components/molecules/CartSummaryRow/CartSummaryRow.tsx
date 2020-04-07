import React from "react";

import { TaxedMoney } from "@components/containers";
import { CachedImage } from "../CachedImage";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const CartSummaryRow: React.FC<IProps> = ({
  id,
  sku,
  name,
  price,
  quantity,
  thumbnail,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Name data-cy={`cartSummaryItem${id}Name`}>{name}</S.Name>
      <S.Sku>
        SKU: <span data-cy={`cartSummaryItem${id}SKU`}>{sku}</span>
      </S.Sku>
      <S.Quantity>
        Quantity:{" "}
        <span data-cy={`cartSummaryItem${id}Quantity`}>{quantity}</span>
      </S.Quantity>
      <S.Price data-cy={`cartSummaryItem${id}Price`}>
        <TaxedMoney taxedMoney={price} />
      </S.Price>
      <S.Photo>
        <CachedImage data-cy={`cartSummaryItem${id}Image`} {...thumbnail} />
      </S.Photo>
    </S.Wrapper>
  );
};

export { CartSummaryRow };
