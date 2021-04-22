import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

interface IProps {
  listImg: any;
}
function CustomizCarousel({ listImg }: IProps) {
  return (
    <div>
      <Carousel showThumbs={false} showStatus={false}>
        {listImg.map((item, index) => {
          return (
            <img
              key={index}
              style={{
                objectFit: "cover",
                maxWidth: "100%",
                height: "100%",
              }}
              alt="#"
              src={item}
            />
          );
        })}
      </Carousel>
    </div>
  );
}

export default CustomizCarousel;
