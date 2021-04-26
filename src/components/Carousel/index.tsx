import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
import ReactSVG from "react-svg";

import arrowImg from "../../images/next.svg";

import "./scss/index.scss";
import {
  mediumScreen,
  smallScreen,
  xxxLargeScreen,
} from "../../globalStyles/scss/variables.scss";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
  isSlide?: boolean;
}

const Carousel: React.FC<CarouselType> = ({ isSlide, children, ...rest }) => {
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
    <Media query={{ maxWidth: smallScreen }}>
      {matches =>
        matches ? (
          carousel(1)
        ) : (
          <Media query={{ maxWidth: mediumScreen }}>
            {matches => carousel(isSlide ? 1 : matches ? 2 : 5)}
          </Media>
        )
      }
    </Media>
  );
};

export default Carousel;
