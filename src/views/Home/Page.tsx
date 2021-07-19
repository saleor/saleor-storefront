// import Link from "next/link";
import Carousel from "nuka-carousel";
import * as React from "react";
import { /* FormattedMessage, */ useIntl } from "react-intl";

import ProductsNews from "@temp/components/ProductsNews";

import { /* Button, Loader, */ ProductsFeatured } from "../../components";
import { structuredData } from "../../core/SEO/Homepage/structuredData";
// import { generateCategoryUrl } from "../../core/utils";
import nextCarouselImg from "../../images/nextCarouselHomePage.svg";
// import noPhotoImg from "../../images/no-photo.svg";
import preCarouselImg from "../../images/preCarouselHomePage.svg";
import {
  ProductsList_categories,
  ProductsList_collection_backgroundImage,
  ProductsList_shop,
} from "./gqlTypes/ProductsList";

import "./scss/index.scss";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_collection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  // const categoriesExist = () => {
  //   return categories && categories.edges && categories.edges.length > 0;
  // };
  const intl = useIntl();

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div
        className="home-page__hero"
        // style={
        //   backgroundImage
        //     ? { backgroundImage: `url(${backgroundImage.url})` }
        //     : null
        // }
      >
        <Carousel
          // withoutControls={true}
          wrapAround
          slidesToShow={1}
          speed={1000}
          renderCenterLeftControls={({ previousSlide, currentSlide }) => (
            <button
              style={{
                transform: "translateX(-22px)",
                // display:`${currentSlide===0?"none":"unset"}`
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
                transform: "translateX(22px)",
                // display:`${currentSlide===(slideCount-slidesToShow)?"none":"unset"}`
              }}
              onClick={nextSlide}
            >
              <img src={nextCarouselImg} alt="" />
            </button>
          )}
        >
          <img
            src="https://anhnendep.net/wp-content/uploads/2015/07/hinh-nen-trai-cay-dep-7.jpg"
            alt=""
          />
          <img
            src="https://media.vov.vn/sites/default/files/styles/large/public/2020-10/nhung-loai-trai-cay-khong-nen-an-khi-giam-can-590.jpg"
            alt=""
          />
          <img
            src="https://2.bp.blogspot.com/-0LVDww5gZw4/VpHOCzNCLeI/AAAAAAAAIcg/Z2I17dbzy3A/s1600/Hinh-anh-dep-cua-trai-cay-hoa-qua-xanh-sach%2B%25281%2529.jpg"
            alt=""
          />
          <img
            src="https://anhnendep.net/wp-content/uploads/2016/02/hinh-nen-hoa-qua-trai-cay-dep-2016-05.jpg"
            alt=""
          />
          <img
            src="https://anhnendep.net/wp-content/uploads/2015/07/hinh-nen-trai-cay-dep-13.jpg"
            alt=""
          />
        </Carousel>
        <div className="home-page__hero-text">
          {/* <div>
            <span className="home-page__hero__title">
              <h1>
                <FormattedMessage defaultMessage="Final reduction" />/
              </h1>
            </span>
          </div>
          <div>
            <span className="home-page__hero__title">
              <h1>
                <FormattedMessage defaultMessage="Up to 70% off sale" />
              </h1>
            </span>
          </div> */}
        </div>
        {/* <div className="home-page__hero-action">
          {loading && !categories ? (
            <Loader />
          ) : (
            categoriesExist() && (
              <Link
                href={generateCategoryUrl(
                  categories.edges[0].node.id,
                  categories.edges[0].node.name
                )}
              >
                <a>
                  <Button testingContext="homepageHeroActionButton">
                    <FormattedMessage defaultMessage="Shop sale" />
                  </Button>
                </a>
              </Link>
            )
          )}
        </div> */}
      </div>
      {/* {categoriesExist() && (
        <div className="home-page__categories">
          <div className="container">
            <h3>
              <FormattedMessage defaultMessage="Shop by category" />
            </h3>
            <div className="home-page__categories__list">
              {categories.edges.map(({ node: category }) => (
                <div
                  key={category.id}
                  className="home-page__categories__list__item"
                >
                  <Link
                    href={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
                    <a>
                      <h3>{category.name}</h3>
                      <div
                        className={classNames(
                          "home-page__categories__list__image",
                          {
                            "home-page__categories__list__image--no-photo": !category.backgroundImage,
                          }
                        )}
                        style={{
                          backgroundImage: `url(${
                            category.backgroundImage
                              ? category.backgroundImage.url
                              : noPhotoImg
                          })`,
                        }}
                      />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
      <ProductsFeatured
        title={intl.formatMessage({ defaultMessage: "Featured" })}
      />
      <ProductsNews
        title={intl.formatMessage({ defaultMessage: "Bảng tin" })}
      />
    </>
  );
};

export default Page;
