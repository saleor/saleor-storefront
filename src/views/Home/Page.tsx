import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "@components/atoms";

import { Loader, ProductsFeatured } from "../../components";
import { generateCategoryUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./types/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import { styled } from "@styles";
import noPhotoImg from "../../images/no-photo.svg";

const DarkButton = styled(Button)`
  border: none;
  color: #1c1c1d;
  background-color: #fff;

  &:hover {
    color: #fff;
    background-color: #1c1c1d;
  }
`;

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => (
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
            <h1>LOOK BEYOND</h1>
          </span>
        </div>
      </div>
      <div className="home-page__hero-action">
        <a href="/dashboard">
          <DarkButton>VIEW DASHBOARD</DarkButton>
        </a>
      </div>
    </div>
    <ProductsFeatured />
    <div className="home-page__categories">
      <div className="container">
        <h3>Shop by category</h3>
        <div className="home-page__categories__list">
          {categories.edges.map(({ node: category }) => (
            <div key={category.id}>
              <Link
                to={generateCategoryUrl(category.id, category.name)}
                key={category.id}
              >
                <div
                  className={classNames("home-page__categories__list__image", {
                    "home-page__categories__list__image--no-photo": !category.backgroundImage,
                  })}
                  style={{
                    backgroundImage: `url(${
                      category.backgroundImage
                        ? category.backgroundImage.url
                        : noPhotoImg
                    })`,
                  }}
                />
                <h3>{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Page;
