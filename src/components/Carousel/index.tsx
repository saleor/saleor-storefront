import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
import ReactSVG from "react-svg";

import { mediumScreen, smallScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.SFC<CarouselType> = ({ children, ...rest }) => {
  const settings = {
    className: "carousel",
    renderBottomCenterControls: () => null,
    renderCenterLeftControls: ({ previousSlide, currentSlide }) =>
      currentSlide !== 0 ? (
        <div
          onClick={previousSlide}
          className="carousel__control carousel__control--left"
        >
          <ReactSVG path="../../images/carousel-arrow.svg" />
        </div>
      ) : null,
    renderCenterRightControls: ({
      nextSlide,
      currentSlide,
      slideCount,
      slidesToShow
    }) =>
      slideCount - slidesToShow !== currentSlide ? (
        <div
          onClick={nextSlide}
          className="carousel__control carousel__control--right"
        >
          <ReactSVG path="../../images/carousel-arrow.svg" />
        </div>
      ) : null,
    ...rest
  };
  return (
    <>
      <Media query={{ maxWidth: smallScreen }}>
        {matches =>
          matches ? (
            <NukaCarousel slidesToShow={1} slidesToScroll={1} {...settings}>
              {children}
            </NukaCarousel>
          ) : (
            <Media query={{ maxWidth: mediumScreen }}>
              {matches =>
                matches ? (
                  <NukaCarousel
                    slidesToShow={2}
                    slidesToScroll={2}
                    {...settings}
                  >
                    {children}
                  </NukaCarousel>
                ) : (
                  <NukaCarousel
                    slidesToShow={4}
                    slidesToScroll={4}
                    {...settings}
                  >
                    {children}
                  </NukaCarousel>
                )
              }
            </Media>
          )
        }
      </Media>
    </>
  );
};

export default Carousel;
