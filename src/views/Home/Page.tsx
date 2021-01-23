import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Button, ProductsFeatured } from "../../components";
import { structuredData } from "../../core/SEO/Homepage/structuredData";
import { generateCategoryUrl } from "../../core/utils";
import noPhotoImg from "../../images/no-photo.svg";
import {
  HomePageProducts_categories,
  HomePageProducts_collection,
  HomePageProducts_shop,
} from "./gqlTypes/HomePageProducts";

import "./scss/index.scss";

const Page: React.FC<{
  categories: HomePageProducts_categories;
  collection: HomePageProducts_collection;
  shop: HomePageProducts_shop;
}> = ({ categories, collection: { backgroundImage, products }, shop }) => {
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
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
              <h1>
                <FormattedMessage defaultMessage="Final reduction" />
              </h1>
            </span>
          </div>
          <div>
            <span className="home-page__hero__title">
              <h1>
                <FormattedMessage defaultMessage="Up to 70% off sale" />
              </h1>
            </span>
          </div>
        </div>
        <div className="home-page__hero-action">
          {categoriesExist() && (
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
          )}
        </div>
      </div>
      <ProductsFeatured
        products={products?.edges.map(e => e.node)}
        title={intl.formatMessage({ defaultMessage: "Featured" })}
      />
      {categoriesExist() && (
        <div className="home-page__categories">
          <div className="container">
            <h3>
              <FormattedMessage defaultMessage="Shop by category" />
            </h3>
            <div className="home-page__categories__list">
              {categories.edges.map(({ node: category }) => (
                <div key={category.id}>
                  <Link
                    href={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
                    <a>
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
                      <h3>{category.name}</h3>
                    </a>
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
