import * as React from "react";
import { Link } from "react-router-dom";
import { structuredData } from "../../core/SEO/Homepage/structuredData";
import "./scss/index.scss";
import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./types/ProductsList";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div className="home-page__hero">
        <div className="home-page__hero-text">
          <div>
            <span className="home-page__hero__title">
              <h1>Welcome!</h1>
            </span>
          </div>
          <div>
            <span className="home-page__hero__title">
              <span>What would you like to do?</span>
            </span>
          </div>
        </div>
        <div className="home-page__hero-btn">
          <Link to="/collections/cabinets">
            <button type="button" className="home-page__btn">Browse Cabinets</button>
          </Link>

          <Link to="/collection/samples">
            <button type="button" className="home-page__btn">Order Samples</button>
          </Link>

          <Link to="/custom-design">
            <button type="button" className="home-page__btn">Get Custom Designs</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
