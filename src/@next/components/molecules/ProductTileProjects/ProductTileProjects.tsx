import React from "react";

import { usePreferences } from "@hooks";
import { RichTextContent } from "@components/atoms";

import { Thumbnail, ThumbnailCollection } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTileProjects: React.FC<IProps> = ({ product }: IProps) => {
  const {
    preferences: { locale },
  } = usePreferences();

  return (
    <S.Wrapper>
      <S.Image data-test="productThumbnail">
        <ThumbnailCollection source={product.collections[1]} />
        <Thumbnail source={product} />
        <div>
          <h3>{product.collections[1].name}</h3>
          <RichTextContent
            descriptionJson={
              locale === "it" &&
              product.collections[1].translation?.descriptionJson
                ? product.collections[1].translation.descriptionJson
                : product.collections[1].descriptionJson
            }
          />
        </div>
      </S.Image>
    </S.Wrapper>
  );
};
