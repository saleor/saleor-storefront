import React from "react";

import { usePreferences } from "@hooks";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTileOther: React.FC<IProps> = ({ product }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  const {
    preferences: { locale },
  } = usePreferences();

  return (
    <S.Wrapper>
      <S.Image data-test="productThumbnail">
        <Thumbnail source={product} />
      </S.Image>
      <S.Title data-test="productTileOther">
        {locale === "en" && product.translation?.name
          ? product.translation.name
          : product.name}
      </S.Title>
      <S.ArtisanName>
        {locale === "en" && product.collections[0].translation?.name
          ? product.collections[0].translation.name
          : product.collections[0].name}
      </S.ArtisanName>
      <S.Price data-test="productPrice">
        <TaxedMoney taxedMoney={price} />
      </S.Price>
    </S.Wrapper>
  );
};
