import Link from "next/link";
import * as React from "react";

import { channelSlug } from "@temp/constants";

import { generateProductUrl } from "../../core/utils";
import nextButton from "../../images/nextCarouselHomePage.svg";
import ProductListItem from "../ProductListItem";
import ProductListItemSale from "../ProductListItemSale";
// import ProductListNews from "../ProductListNews";
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
            <>
              <div className="products-featured">
                <h3>Sản Phẩm Mới</h3>
                <div className="products-featured__container">
                  <div className="list__product">
                    {products.map(({ node: product }) => (
                      <Link
                        href={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <a>
                          <ProductListItem product={product} />
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
                <img className="icon-nextButton" src={nextButton} alt="" />
              </div>
              <div className="products-featured">
                <div className="products-featured__container">
                  <h3>Sản Phẩm Hot</h3>
                  <div className="list__product">
                    {products.map(({ node: product }) => (
                      <Link
                        href={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <a>
                          <ProductListItem product={product} />
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
                <img className="icon-nextButton" src={nextButton} alt="" />
              </div>
              <div className="products-featured products-featured-sale">
                <div className="products-featured__container">
                  <h3>Sản Phẩm Giảm Giá</h3>
                  <div className="list__product list__product-sale">
                    {products.map(({ node: product }) => (
                      <Link
                        href={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <a>
                          <ProductListItemSale product={product} />
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
                <img className="icon-nextButton" src={nextButton} alt="" />
              </div>
            </>
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
