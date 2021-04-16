import "./styles";

import React from "react";
import ReactImageZoom from "react-image-zoom";
import { useInView } from "react-intersection-observer";

import { Icon } from "@components/atoms";
import { CachedImage } from "@components/molecules";

import { ListImageModal } from "../ListImageModal";
import * as S from "./styles";
import { IProps } from "./types";

const MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS = 4;

export const ProductGallery: React.FC<IProps> = ({ images }: IProps) => {
  const [imageIndex, setImageIndex] = React.useState<number>(0);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [listImage, setListImage] = React.useState<any>([]);

  const displayButtons = images.length > MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS;

  React.useEffect(() => {
    if (imageIndex >= images.length) {
      setImageIndex(0);
    }
  }, [images]);

  const bottomImageRef = React.useRef<HTMLDivElement | null>(null);
  const topImageRef = React.useRef<HTMLDivElement | null>(null);
  const [topImageIntersectionObserver, topImageInView] = useInView({
    threshold: 0.5,
  });

  const [bottomImageIntersectionObserver, bottomImageInView] = useInView({
    threshold: 0.5,
  });

  const setBottomRef = React.useCallback(
    node => {
      bottomImageRef.current = node;
      bottomImageIntersectionObserver(node);
    },
    [bottomImageIntersectionObserver]
  );

  const setTopRef = React.useCallback(
    node => {
      topImageRef.current = node;
      topImageIntersectionObserver(node);
    },
    [topImageIntersectionObserver]
  );

  const setIntersectionObserver = (index: number, lengthOfArray: number) => {
    if (lengthOfArray > MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS) {
      if (index === 0) {
        return setTopRef;
      }
      if (index === lengthOfArray - 1) {
        return setBottomRef;
      }
    }
  };

  const propsImg = {
    width: 450,
    height: 450,
    zoomWidth: 500,
    img: images[imageIndex].url,
    scale: 1.5,
  };

  const onShowModal = (imgUrl: any) => {
    setShowModal(true);
    setListImage(imgUrl);
  };

  const onChangeIndex = (index: number) => {
    setImageIndex(index);
  };

  return (
    <S.Wrapper data-test="productPhotosGallery">
      <S.ThumbnailsContainer>
        {!topImageInView && displayButtons && (
          <S.TopButton
            onClick={() => {
              if (topImageRef.current) {
                topImageRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });
              }
            }}
          >
            <div style={{ transform: " rotate(90deg)" }}>
              <Icon name="select_arrow" size={10} />
            </div>
          </S.TopButton>
        )}
        {!bottomImageInView && displayButtons && (
          <S.BottomButton
            onClick={() => {
              if (bottomImageRef.current) {
                bottomImageRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });
              }
            }}
          >
            <div style={{ transform: " rotate(-90deg)" }}>
              <Icon name="select_arrow" size={10} />
            </div>
          </S.BottomButton>
        )}
        <S.ThumbnailList>
          <ul>
            {images &&
              images.length > 0 &&
              images.map((image, index) => {
                return (
                  <li
                    key={index}
                    data-test="galleryThumbnail"
                    data-test-id={index}
                  >
                    <S.Thumbnail
                      ref={setIntersectionObserver(index, images.length)}
                      onClick={() => setImageIndex(index)}
                      // onMouseEnter={() => setImageIndex(index)}
                      activeThumbnail={Boolean(index === imageIndex)}
                    >
                      <CachedImage alt={image.alt} url={image.url} />
                    </S.Thumbnail>
                  </li>
                );
              })}
          </ul>
        </S.ThumbnailList>
        {/* <p>Thumbnail</p> */}
      </S.ThumbnailsContainer>

      <S.Preview data-test="imagePreview" className="wrapper">
        {images && images.length > 0 && imageIndex < images.length && (
          <div
            className="customize-zoomimg"
            style={{ maxWidth: "30%" }}
            onClick={() => onShowModal(images)}
          >
            <ReactImageZoom {...propsImg} />
          </div>
        )}
        {images.length === 0 && <CachedImage />}
      </S.Preview>

      <ListImageModal
        selectedImage={imageIndex}
        showModal={showModal}
        setShowModal={setShowModal}
        listImage={listImage}
        onChangeIndex={onChangeIndex}
      />
    </S.Wrapper>
  );
};
