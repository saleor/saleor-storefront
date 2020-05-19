import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Loader, ProductsFeatured } from "../../components";
import { generateCategoryUrl, generateCollectionUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import noPhotoImg from "../../images/no-photo.svg";

import { FormattedMessage, useIntl } from "react-intl";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {

  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };
  const homeCollectionExist = () => {
    return shop && shop.homepageCollection && shop.homepageCollection.id && shop.homepageCollection.name;
  };
  const intl = useIntl();

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div
        className="home-page__hero"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage.url})` }
            : null
        }
      >
         <div className="home-page__hero-text">
          <div>
            <span className="home-page__hero__title">
            {loading && !shop ? (
            <Loader />
          ) : (
            homeCollectionExist() && <h1>{
              shop.homepageCollection.translation?.name || shop.homepageCollection.name}</h1>
        
          )}
            </span>
          </div>
        </div>
        <div className="home-page__hero-action">
          {loading && !shop ? (
            <Loader />
          ) : (
            homeCollectionExist() && (
              <Link
              to={generateCollectionUrl(
                shop.homepageCollection.id,
                shop.homepageCollection.name
                )}
              >
                <Button>
                  <FormattedMessage
                    description="button discover home page collection"
                    defaultMessage="discover"
                  />
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
      <ProductsFeatured 
        title={intl.formatMessage({
          defaultMessage: "Featured",
          description: "ProductsFeatured home page section name",
       })}/>
      {categoriesExist() && (
        <div className="home-page__categories">
          <div className="container">
            <h3>
            <FormattedMessage
                    description="title home page shop by category "
                    defaultMessage="Shop by category"
                  />
            </h3>
            <div className="home-page__categories__list">
              {categories.edges.map(({ node: category }) => (
                <div key={category.id}>
                  <Link
                    to={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
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
                    <h3>{category.translation?.name || category.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
