import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Loader, ProductsCategories } from "../../components";
import { generateCollectionUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_collections,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage
} from "./types/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import noPhotoImg from "../../images/no-photo.svg";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  collections: ProductsList_collections;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, collections, backgroundImage, shop }) => (
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
            <h1>Discover Unique Italian Furniture & Décor</h1>
          </span>
        </div>
        <div>
          <span className="home-page__hero__title">
            <h3>Timeless Stories of Italy</h3>
          </span>
        </div>
      </div>
      <div className="home-page__hero-action">
        {loading && !collections ? (
          <Loader />
        ) : (
          <Link
            to={generateCollectionUrl(
              collections.edges[1].node.id,
              collections.edges[1].node.name
            )}
          >
            <Button>Explore</Button>
          </Link>
        )}
      </div>
    </div>
    <ProductsCategories />
    <div className="home-page__categories">
      <div className="container">
        <h1>Latest Stories</h1>
        <div className="home-page__categories__list">
          {collections.edges.map(({ node: collection }) => (
            <div key={collection.id}>
              <Link
                to={generateCollectionUrl(collection.id, collection.name)}
                key={collection.id}
              >
                <div
                  className={classNames("home-page__categories__list__image", {
                    "home-page__categories__list__image--no-photo": !collection.backgroundImage,
                  })}
                  style={{
                    backgroundImage: `url(${
                      collection.backgroundImage
                        ? collection.backgroundImage.url
                        : noPhotoImg
                    })`,
                  }}
                />
                <h3>{collection.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Page;
