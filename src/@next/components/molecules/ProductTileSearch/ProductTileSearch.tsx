import React from "react";

import { Thumbnail } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTileSearch: React.FC<IProps> = ({ product }: IProps) => {
  return (
    <S.Wrapper>
      <S.Image data-test="productThumbnail">
        <Thumbnail source={product} />
      </S.Image>
      <S.Title data-test="ProductTileSearch">{product.name}</S.Title>
    </S.Wrapper>
  );
};
