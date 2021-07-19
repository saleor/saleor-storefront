import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { generateProductUrl } from "@temp/core/utils";

import { Carousel } from "../../components";
import nextButton from "../../images/nextCarouselHomePage.svg";
import { ProductDetails_product_category_products_edges } from "./gqlTypes/ProductDetails";
import ProductListItemDetail from "./ProductListItemDetail";

const SlideCarousel: React.FC<{
  products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => (
  <div className="products-featured-slide">
    <div className="container">
      <h4 className="product-page__other-products__title">
        <FormattedMessage defaultMessage="Supplier's popular products" />
      </h4>
      <Carousel>
        {products.map(({ node: product }) => (
          <Link
            href={generateProductUrl(product.id, product.name)}
            key={product.id}
          >
            <a>
              <ProductListItemDetail product={product} />
            </a>
          </Link>
        ))}
      </Carousel>
      <img className="nextButton" src={nextButton} alt="" />
    </div>
  </div>
);

export default SlideCarousel;
