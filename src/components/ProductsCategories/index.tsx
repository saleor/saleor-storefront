import * as React from "react";
import { Link } from "react-router-dom";

import { Carousel, ProductListItemCategory } from "..";
import { generateCategoryUrl, maybe } from "../../core/utils";
import { TypedFeaturedProductsQuery } from "./queries";

import "./scss/index.scss";

interface ProductsFeaturedProps {
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title }) => {
  return (
    <TypedFeaturedProductsQuery displayError={false}>
      {({ data }) => {
        const products = maybe(
          () => data.shop.homepageCollection.products.edges,
          []
        );

        if (products.length) {
          return (
            <div className="products-featured">
              <div className="container">
                <h1>{title}</h1>
                <Carousel>
                  {products.map(({ node: product }) => (
                    <Link
                      to={generateCategoryUrl(product.category.id, product.category.name)}
                      key={product.category.id}
                    >
                      <ProductListItemCategory product={product} />
                    </Link>
                  ))}
                </Carousel>
              </div>
            </div>
          );
        }
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Gifting Categories",
};

export default ProductsFeatured;
