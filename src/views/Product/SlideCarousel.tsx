import { generateProductUrl } from "@temp/core/utils";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Carousel } from "../../components";
import { ProductDetails_product_category_products_edges } from "./gqlTypes/ProductDetails";
import ProductListItemDetail from "./ProductListItemDetail";

const SlideCarousel: React.FC<{
  products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => (
  <div className="products-featured">
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
    </div>
  </div>
);

export default SlideCarousel;
