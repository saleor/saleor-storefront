import * as React from "react";
import { Link } from "react-router-dom";

import { channelSlug } from "@temp/constants";
import { Carousel, ProductListItem } from "..";
import { generateProductUrl } from "../../core/utils";
import { TypedFeaturedProductsQuery } from "./queries";

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
            <div className="products-featured">
              <div className="container">
                <h3>{title}</h3>
                <Carousel>
                  {products.map(({ node: product }) => (
                    <Link
                      to={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <ProductListItem product={product} />
                    </Link>
                  ))}
                </Carousel>
              </div>
            </div>
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
