import React from "react";

import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductGallery: React.FC<IProps> = ({ images }: IProps) => {
  const [imageIndex, setImageIndex] = React.useState<number>(0);
  console.log(images, imageIndex);

  return (
    <S.Wrapper>
      <S.ThumnbanilsContainer>
        <S.ThumbnailList>
          <ul>
            <li>
              {images &&
                images.length > 0 &&
                images.map((image, index) => {
                  return (
                    <S.Thumbnail
                      onClick={() => setImageIndex(index)}
                      onMouseEnter={() => setImageIndex(index)}
                      activeThumbnail={Boolean(index === imageIndex)}
                    >
                      <CachedImage alt={image.alt} url={image.url} />
                    </S.Thumbnail>
                  );
                })}
            </li>
          </ul>
        </S.ThumbnailList>
      </S.ThumnbanilsContainer>

      <S.Preview>
        {images && images.length > 0 && (
          <CachedImage
            alt={images[imageIndex].alt}
            url={images[imageIndex].url}
          />
        )}
      </S.Preview>
    </S.Wrapper>
  );
};
