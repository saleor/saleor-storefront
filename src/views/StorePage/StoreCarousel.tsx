import * as React from "react";

import { CachedImage } from "@components/molecules";

import { Carousel } from "../../components";
import noPhotoImg from "../../images/no-photo.svg";
import { ProductDetails_product_images } from "../Product/gqlTypes/ProductDetails";

import "./scss/index.scss";

const StoreCarousel: React.FC<{
  images: ProductDetails_product_images[];
  isSlide?: boolean;
}> = ({ images, isSlide }) => (
  <div className="store_carousel">
    <div className="store_carousel_container">
      <Carousel
        isSlide={isSlide}
        renderBottomCenterControls={props => {
          const indexes = [];

          for (let i = 0; i < props.slideCount; i++) {
            indexes.push(i);
          }

          return (
            <ul className="store_carousel_container__nav">
              {indexes.map(index => (
                <li
                  key={index}
                  onClick={props.goToSlide.bind(null, index)}
                  className={props.currentSlide === index ? "active" : ""}
                >
                  <span />
                </li>
              ))}
            </ul>
          );
        }}
      >
        {images.map(image => (
          <CachedImage url={image.url || noPhotoImg} key={image.id}>
            <img src={noPhotoImg} alt={image.alt} />
          </CachedImage>
        ))}
      </Carousel>
    </div>
  </div>
);

export default StoreCarousel;
