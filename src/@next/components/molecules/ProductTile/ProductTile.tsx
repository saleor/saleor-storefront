import React from "react";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  return (
    <S.Wrapper>
      <S.Title>{product.name}</S.Title>
      <S.Price>
        <TaxedMoney taxedMoney={price} />
      </S.Price>
      <S.Image>
        <Thumbnail source={product} />
      </S.Image>
    </S.Wrapper>
  );
};
