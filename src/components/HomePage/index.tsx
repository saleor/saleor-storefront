import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { Button, Carousel, Loader, ProductListItem } from "..";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
import { GET_PRODUCTS_AND_CATEGORIES } from "./queries";

import "./scss/index.scss";

const HomePage: React.SFC = () => (
  <div className="home-page">
    <Query
      query={GET_PRODUCTS_AND_CATEGORIES}
      fetchPolicy="cache-and-network"
      errorPolicy="all"
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <Loader full />;
        }
        if (error && !data) {
          return `Error!: ${error}`;
        }
        return (
          <>
            <div
              className="home-page__hero"
              style={
                data.shop.homepageCollection.backgroundImage
                  ? {
                      backgroundImage: `url(${
                        data.shop.homepageCollection.backgroundImage.url
                      })`
                    }
                  : null
              }
            >
              <span className="home-page__hero__title">
                <h1>Final reduction</h1>
              </span>
              <br />
              <span className="home-page__hero__title">
                <h1>Up to 70% off sale</h1>
              </span>
              <br />
              <Button>Shop sale</Button>
            </div>
            <div className="home-page__featured">
              <div className="container">
                <h3>Featured</h3>
                <Carousel>
                  {data.shop.homepageCollection.products.edges.map(
                    ({ node: product }) => (
                      <Link
                        to={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <ProductListItem product={product} />
                      </Link>
                    )
                  )}
                </Carousel>
              </div>
            </div>
            <div className="home-page__categories">
              <div className="container">
                <h3>Shop by category</h3>
                <div className="home-page__categories__list">
                  {data.categories.edges.map(({ node: category }) => (
                    <div key={category.id}>
                      <Link
                        to={generateCategoryUrl(category.id, category.name)}
                        key={category.id}
                      >
                        <div
                          className="home-page__categories__list__image"
                          style={
                            category.backgroundImage
                              ? {
                                  backgroundImage: `url(${
                                    category.backgroundImage.url
                                  })`
                                }
                              : null
                          }
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
      }}
    </Query>
  </div>
);

export default HomePage;
