import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { ProductListItem } from "..";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { GET_PRODUCTS_AND_CATEGORIES } from "./queries";

import "./scss/index.scss";

const HomePage: React.SFC = () => (
  <div className="home-page">
    <h1>Home page</h1>
    <Query query={GET_PRODUCTS_AND_CATEGORIES}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Loading";
        }
        if (error) {
          return `Error!: ${error}`;
        }
        return (
          <>
            <h2>New Arrivals</h2>
            <div className="home-page__new-arrivals">
              {data.products.edges.map(({ node: product }) => (
                <Link
                  to={`/product/${slugify(product.name)}/${getDBIdFromGraphqlId(
                    product.id,
                    "Product"
                  )}/`}
                  key={product.id}
                >
                  <ProductListItem product={product} />
                </Link>
              ))}
            </div>
            <h2>Categories</h2>
            <ul>
              {data.categories.edges.map(({ node: category }) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${slugify(
                      category.name
                    )}/${getDBIdFromGraphqlId(category.id, "Category")}/`}
                    key={category.id}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        );
      }}
    </Query>
  </div>
);

export default HomePage;
