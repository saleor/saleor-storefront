import React from "react";

import { usePreferences } from "@hooks";
import { ThumbnailCollection } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTileStories: React.FC<IProps> = ({ product }: IProps) => {
  const {
    preferences: { locale },
  } = usePreferences();

  return (
    <S.Wrapper>
      <S.Image data-test="productThumbnail">
        <ThumbnailCollection source={product.collections[0]} />
        <div>
          <h3>
            {locale === "en" && product.collections[0].translation?.name
              ? product.collections[0].translation.name
              : product.collections[0].name}
          </h3>
        </div>
      </S.Image>
    </S.Wrapper>
  );
};
