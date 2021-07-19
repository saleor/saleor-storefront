import Link from "next/link";
import * as React from "react";

import { channelSlug } from "@temp/constants";

import { generateProductUrl } from "../../core/utils";
import nextButton from "../../images/nextCarouselHomePage.svg";
// import { ProductListItem } from "..";
import ProductListNews from "../ProductListNews";
import { TypedFeaturedProductsQuery } from "./queries";

import "./scss/index.scss";

interface ProductsFeaturedProps {
  title?: string;
}

const ProductsNews: React.FC<ProductsFeaturedProps> = ({ title }) => {
  return (
    <TypedFeaturedProductsQuery
      displayError={false}
      variables={{ channel: channelSlug }}
    >
      {({ data }) => {
        const products = data.collection?.products?.edges || [];

        if (products.length) {
          return (
            <div className="products-news">
              <h3>Bảng Tin</h3>
              <div className="products-news__container">
                <div className="list__product-news">
                  {products.slice(0, 3).map(({ node: product }) => (
                    <Link
                      href={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <a>
                        <ProductListNews product={product} />
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <img className="icon-nextButton" src={nextButton} alt="" />
            </div>
          );
        }
        return null;
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsNews.defaultProps = {
  title: "Bảng tin",
};

export default ProductsNews;
