import React from "react";

import { usePreferences } from "@hooks";
import { RichTextContent } from "@components/atoms";

import { Thumbnail, ThumbnailCollection } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTileStories: React.FC<IProps> = ({ product }: IProps) => {
  const {
    preferences: { locale },
  } = usePreferences();

  return (
    <S.Wrapper>
      <S.Image data-test="productThumbnail">
        <div>
          <h3>
            {locale === "en" && product.collections[0].translation?.name
              ? product.collections[0].translation.name
              : product.collections[0].name}
          </h3>
          <RichTextContent
            descriptionJson={
              locale === "en" &&
              product.collections[0].translation?.descriptionJson
                ? product.collections[0].translation.descriptionJson
                : product.collections[0].descriptionJson
            }
          />
        </div>
        <ThumbnailCollection source={product.collections[0]} />
        <Thumbnail source={product} />
      </S.Image>
    </S.Wrapper>
  );
};
