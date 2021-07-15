import Link from "next/link";
import * as React from "react";

import { channelSlug } from "@temp/constants";

import { generateProductUrl } from "../../core/utils";
// import nextButton from "../../images/nextCarouselHomePage.svg";
import nextCarouselImg from "../../images/nextCarouselHomePage.svg";
// import noPhotoImg from "../../images/no-photo.svg";
import preCarouselImg from "../../images/preCarouselHomePage.svg";
import ProductListItem from "../ProductListItem";
import ProductListItemSale from "../ProductListItemSale";
// import ProductListNews from "../ProductListNews";
import { TypedFeaturedProductsQuery } from "./queries";

import Carousel from "nuka-carousel";

import "./scss/index.scss";

interface ProductsFeaturedProps {
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title }) => {
  return (
    <TypedFeaturedProductsQuery
      displayError={false}
      variables={{ channel: channelSlug }}
    >
      {({ data }) => {
        const products = data.collection?.products?.edges || [];

        if (products.length) {
          return (
            <>
              <div className="products-featured">
                <h3>Sản Phẩm Mới</h3>
                <div className="products-featured__container">
                  <div className="list__product" style={{ display: "unset" }}>
                    <Carousel
                      wrapAround={true}
                      slidesToScroll={5}
                      slidesToShow={5}
                      speed={1000}
                      // withoutControls={true}
                      renderCenterLeftControls={({ previousSlide, currentSlide }) => (
                        <button
                          style={{
                            transform: "translate(-22px, -32px)",
                            // display: `${currentSlide === 0 ? "none" : "unset"}`
                          }}
                          onClick={previousSlide}
                        >
                          <img src={preCarouselImg} alt="" />
                        </button>
                      )
                      }
                      renderCenterRightControls={({ nextSlide, currentSlide, slideCount, slidesToShow }) => (
                        <button
                          style={{ transform: "translate(22px, -32px)", 
                            // display: `${currentSlide === (slideCount - slidesToShow) ? "none" : "unset"}` 
                          }}
                          onClick={nextSlide}
                        >
                          <img src={nextCarouselImg} alt="" />
                        </button>
                      )}
                    >
                      {products.map(({ node: product }) => (
                        <Link
                          href={generateProductUrl(product.id, product.name)}
                          key={product.id}
                        >
                          <a>
                            <ProductListItem product={product} />
                          </a>
                        </Link>
                      ))}
                    </Carousel>

                  </div>
                </div>
                {/* <img className="icon-nextButton" src={nextButton} alt="" /> */}
              </div>
              <div className="products-featured">
                <h3>Sản Phẩm Hot</h3>
                <div className="products-featured__container">
                  <div className="list__product" style={{ display: "unset" }}>
                    <Carousel
                      wrapAround={true}
                      slidesToScroll={5}
                      slidesToShow={5}
                      speed={1000}
                      // withoutControls={true}
                      renderCenterLeftControls={({ previousSlide, currentSlide }) => (
                        <button
                          style={{
                            transform: "translate(-22px, -32px)",
                            // display: `${currentSlide === 0 ? "none" : "unset"}`
                          }}
                          onClick={previousSlide}
                        >
                          <img src={preCarouselImg} alt="" />
                        </button>
                      )
                      }
                      renderCenterRightControls={({ nextSlide, currentSlide, slideCount, slidesToShow }) => (
                        <button
                          style={{ transform: "translate(22px, -32px)", 
                            // display: `${currentSlide === (slideCount - slidesToShow) ? "none" : "unset"}` 
                          }}
                          onClick={nextSlide}
                        >
                          <img src={nextCarouselImg} alt="" />
                        </button>
                      )}
                    >
                      {products.map(({ node: product }) => (
                        <Link
                          href={generateProductUrl(product.id, product.name)}
                          key={product.id}
                        >
                          <a>
                            <ProductListItem product={product} />
                          </a>
                        </Link>
                      ))}
                    </Carousel>

                  </div>
                </div>
                {/* <img className="icon-nextButton" src={nextButton} alt="" /> */}
              </div>

              <div className="products-featured products-featured-sale">
                <div className="products-featured__container">
                  <h3>Sản Phẩm Giảm Giá</h3>
                  <div className="list__product list__product-sale" style={{ display: "unset" }}>
                    <Carousel
                      // withoutControls={true}
                      wrapAround={true}
                      slidesToScroll={5}
                      slidesToShow={5}
                      speed={1000}
                      renderCenterLeftControls={({ previousSlide, currentSlide }) => (
                        <button
                          style={{
                            transform: "translate(-22px, -32px)",
                            // display: `${currentSlide === 0 ? "none" : "unset"}`
                          }}
                          onClick={previousSlide}
                        >
                          <img src={preCarouselImg} alt="" />
                        </button>
                      )
                      }
                      renderCenterRightControls={({ nextSlide, currentSlide, slideCount, slidesToShow }) => (
                        <button
                          style={{ transform: "translate(22px, -32px)", 
                            // display: `${currentSlide === (slideCount - slidesToShow) ? "none" : "unset"}` 
                          }}
                          onClick={nextSlide}
                        >
                          <img src={nextCarouselImg} alt="" />
                        </button>
                      )}
                    >
                      {products.map(({ node: product }) => (
                        <Link
                          href={generateProductUrl(product.id, product.name)}
                          key={product.id}
                        >
                          <a>
                            <ProductListItemSale product={product} />
                          </a>
                        </Link>
                      ))}
                    </Carousel>

                    {/* {products.map(({ node: product }) => (
                      <Link
                        href={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <a>
                          <ProductListItemSale product={product} />
                        </a>
                      </Link>
                    ))} */}
                  </div>
                </div>
                {/* <img className="icon-nextButton" src={nextButton} alt="" /> */}
              </div>
            </>
          );
        }
        return null;
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Featured",
};

export default ProductsFeatured;
