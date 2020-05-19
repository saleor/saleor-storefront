import React from "react";

import { TaxedMoney } from "@components/containers";
import { CachedImage } from "../CachedImage";

import * as S from "./styles";
import { IProps } from "./types";

import { FormattedMessage } from "react-intl";

/**
 * Row with product to display in cart summary.
 */
const CartSummaryRow: React.FC<IProps> = ({
  index,
  sku,
  name,
  price,
  quantity,
  thumbnail,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Name data-cy={`cartSummaryItem${index}Name`}>{name}</S.Name>
      <S.Sku>
        <FormattedMessage
          defaultMessage="SKU: "
        />
        <span data-cy={`cartSummaryItem${index}SKU`}>{sku}</span>
      </S.Sku>
      <S.Quantity>
        <FormattedMessage
          defaultMessage="Quantity: "
        />
        <span data-cy={`cartSummaryItem${index}Quantity`}>{quantity}</span>
      </S.Quantity>
      <S.Price data-cy={`cartSummaryItem${index}Price`}>
        <TaxedMoney taxedMoney={price} />
      </S.Price>
      <S.Photo>
        <CachedImage data-cy={`cartSummaryItem${index}Image`} {...thumbnail} />
      </S.Photo>
    </S.Wrapper>
  );
};

export { CartSummaryRow };
