import React from "react";
import { useInView } from "react-intersection-observer";

import { CachedImage } from "@components/molecules";
import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductGallery: React.FC<IProps> = ({ images }: IProps) => {
  const [imageIndex, setImageIndex] = React.useState<number>(0);

  const bottomRef = React.useRef();
  const topRef = React.useRef();
  const [topImage, topImageInView] = useInView({
    threshold: 0.5,
  });

  const [bottomImage, bottomImageInView] = useInView({
    threshold: 0.5,
  });

  const setBottomRef = React.useCallback(
    node => {
      bottomRef.current = node;
      bottomImage(node);
    },
    [bottomImage]
  );

  const setTopRef = React.useCallback(
    node => {
      topRef.current = node;
      topImage(node);
    },
    [topImage]
  );

  const setIntersectionObserver = (index, lengthOfArray) => {
    if (lengthOfArray > 2) {
      if (index === 0) {
        return setTopRef;
      }
      if (index === lengthOfArray - 1) {
        return setBottomRef;
      }
    }
  };

  if (imageIndex > images.length) {
    setImageIndex(0);
  }

  return (
    <S.Wrapper>
      <S.ThumnbanilsContainer>
        {!topImageInView && (
          <S.TopButton
            onClick={() => {
              if (topRef.current) {
                topRef.current.scrollIntoView({
                  block: "end",
                  inline: "nearest",
                  behavior: "smooth",
                });
              }
            }}
          >
            <Icon name="select_arrow" size={10} />
          </S.TopButton>
        )}
        {!bottomImageInView && (
          <S.BottomButton
            onClick={() => {
              if (bottomRef.current) {
                bottomRef.current.scrollIntoView({
                  block: "end",
                  inline: "nearest",
                  behavior: "smooth",
                });
              }
            }}
          >
            <Icon name="select_arrow" size={10} />
          </S.BottomButton>
        )}
        <S.ThumbnailList>
          <ul>
            {images &&
              images.length > 0 &&
              images.map((image, index) => {
                return (
                  <li>
                    <S.Thumbnail
                      ref={setIntersectionObserver(index, images.length)}
                      onClick={() => setImageIndex(index)}
                      onMouseEnter={() => setImageIndex(index)}
                      activeThumbnail={Boolean(index === imageIndex)}
                    >
                      <CachedImage alt={image.alt} url={image.url} />
                    </S.Thumbnail>
                  </li>
                );
              })}
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
