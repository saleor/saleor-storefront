import React from "react";
import ImageGallery from "react-image-gallery";

import { Modal } from "../Modal";
import { IProps } from "./types";

import "./style.css";

export const ListImageModal: React.FC<IProps> = ({
  showModal,
  setShowModal,
  listImage,
  selectedImage,
}: IProps) => {
  const images = listImage.map((item: any) => ({
    original: item.url,
    thumbnail: item.url,
  }));
  return (
    <div>
      <Modal
        submitButtonTestingContext="submitAddressFormModalButton"
        testingContext="submitAddressFormModal"
        title="Image product"
        hide={() => {
          setShowModal(false);
        }}
        disabled={false}
        show={showModal}
        submitBtnText=""
      >
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
          startIndex={selectedImage}
          onSlide={(index: number) => {
            console.log(index);
          }}
        />
      </Modal>
    </div>
  );
};
