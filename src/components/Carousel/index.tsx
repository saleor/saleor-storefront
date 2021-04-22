import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
import ReactSVG from "react-svg";

import arrowImg from "../../images/next.svg";

import "./scss/index.scss";
import {
  smallScreen,
  xxxLargeScreen,
} from "../../globalStyles/scss/variables.scss";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselType> = ({ children, ...rest }) => {
  const settings = {
    className: "carousel",
    renderBottomCenterControls: () => null,
    renderCenterLeftControls: ({ previousSlide, currentSlide }) =>
      currentSlide !== 0 ? (
        <div
          onClick={previousSlide}
          className="carousel__control carousel__control--left"
        >
          <ReactSVG path={arrowImg} />
        </div>
      ) : null,
    renderCenterRightControls: ({
      nextSlide,
      currentSlide,
      slideCount,
      slidesToShow,
    }) =>
      slideCount - slidesToShow !== currentSlide ? (
        <div
          onClick={nextSlide}
          className="carousel__control carousel__control--right"
        >
          <ReactSVG path={arrowImg} />
        </div>
      ) : null,
    ...rest,
  };
  const carousel = (slides: number) => (
    <NukaCarousel
      slidesToShow={slides}
      slidesToScroll={slides}
      autoplay
      {...settings}
      initialSlideHeight={500}
    >
      {children}
    </NukaCarousel>
  );

  return (
    <Media query={{ minWidth: smallScreen }}>
      {matches =>
        matches ? (
          carousel(1)
        ) : (
          <Media query={{ maxWidth: xxxLargeScreen }}>
            {matches ? (
              carousel(1)
            ) : (
              <Media query={{ maxWidth: "4096px" }}>
                {!matches && carousel(1)}
              </Media>
            )}
          </Media>
        )
      }
    </Media>
  );
};

export default Carousel;
