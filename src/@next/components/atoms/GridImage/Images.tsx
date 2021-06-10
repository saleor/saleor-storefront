import React from "react";

import { ListImageModal } from "@components/organisms/ListImageModal";

import * as S from "./styles";

function Images(props: any) {
  const { images } = props;
  const [showModal, setShowModal] = React.useState(false);
  const [imgIndex, setImgIndex] = React.useState(0);

  const onChangeIndex = (e: number) => {
    setImgIndex(e);
  };

  return (
    <S.Wrapper>
      {images.map((item: any, index: number) => {
        if (index > 3) {
          return;
        }
        return (
          <S.ImgBox
            onClick={() => {
              setImgIndex(index);
              setShowModal(true);
            }}
          >
            <S.Img src={item.url} alt="" />

            {index === 3 && images.length > 4 && (
              <S.OverLay>
                <p
                  style={{ color: "#fff", fontWeight: 700, fontSize: "1.2rem" }}
                >
                  +{images.length - 4}
                </p>
              </S.OverLay>
            )}
          </S.ImgBox>
        );
      })}

      {showModal && (
        <ListImageModal
          selectedImage={imgIndex}
          showModal={showModal}
          setShowModal={setShowModal}
          listImage={images}
          title="Carousel"
          onChangeIndex={onChangeIndex}
        />
      )}
    </S.Wrapper>
  );
}

export default Images;
