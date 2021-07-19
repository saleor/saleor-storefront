import Link from "next/link";
import Carousel from "nuka-carousel";
import * as React from "react";

import { channelSlug } from "@temp/constants";

import { generateProductUrl } from "../../core/utils";
import nextCarouselImg from "../../images/nextCarouselHomePage.svg";
import preCarouselImg from "../../images/preCarouselHomePage.svg";
// import nextButton from "../../images/nextCarouselHomePage.svg";
// import { ProductListItem } from "..";
import ProductListNews from "../ProductListNews";
import { TypedFeaturedProductsQuery } from "./queries";

import "./scss/index.scss";

interface ProductsFeaturedProps {
  title?: string;
}

const ProductsNews: React.FC<ProductsFeaturedProps> = ({ title }) => {
  return (
    <TypedFeaturedProductsQuery
      displayError={false}
      variables={{ channel: channelSlug }}
    >
      {({ data }) => {
        const products = data.collection?.products?.edges || [];
        if (products.length) {
          return (
            <div className="products-news">
              <h3>{title}</h3>
              <div className="products-news__container">
                <div
                  className="list__product-news"
                  style={{ display: "unset" }}
                >
                  <Carousel
                    // withoutControls={true}
                    wrapAround
                    slidesToScroll={3}
                    slidesToShow={3}
                    speed={1000}
                    defaultControlsConfig={{
                      pagingDotsStyle: { display: "none" },
                    }}
                    renderCenterLeftControls={({
                      previousSlide,
                      currentSlide,
                    }) => (
                      <button
                        style={{
                          transform: "translate(-22px, -32px)",
                          // display: `${currentSlide === 0 ? "none" : "unset"}`
                        }}
                        onClick={previousSlide}
                      >
                        <img src={preCarouselImg} alt="" />
                      </button>
                    )}
                    renderCenterRightControls={({
                      nextSlide,
                      currentSlide,
                      slideCount,
                      slidesToShow,
                    }) => (
                      <button
                        style={{
                          transform: "translate(22px, -32px)",
                          // display: `${currentSlide === (slideCount - slidesToShow) ? "none" : "unset"}`
                        }}
                        onClick={nextSlide}
                      >
                        <img src={nextCarouselImg} alt="" />
                      </button>
                    )}
                    // renderBottomCenterControls={({}) => (
                    //   <button
                    //     style={{
                    //       display: "none",
                    //     }}
                    //   >
                    //     text
                    //   </button>
                    // )}
                  >
                    {products.map(({ node: product }) => (
                      <Link
                        href={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <a>
                          <ProductListNews product={product} />
                        </a>
                      </Link>
                    ))}
                  </Carousel>

                  {/* {products.slice(0, 3).map(({ node: product }) => (
                    <Link
                      href={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <a>
                        <ProductListNews product={product} />
                      </a>
                    </Link>
                  ))} */}
                </div>
              </div>
              {/* <img className="icon-nextButton" src={nextButton} alt="" /> */}
            </div>
          );
        }
        return null;
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsNews.defaultProps = {
  title: "Bảng tin",
};

export default ProductsNews;
