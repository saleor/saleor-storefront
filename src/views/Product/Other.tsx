import * as React from "react";
import { Link } from "react-router-dom";

import { ProductListItem } from "../../components";
import { generateProductUrl } from "../../core/utils";
import { ProductDetails_product_category_products_edges } from "./types/ProductDetails";

const OtherProducts: React.FC<{
  products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => (
  <div className="product-page__other-products">
    <div className="container">
      <h5 className="product-page__other-products__title">
        You may also like
      </h5>
      <div className="product-page__other-products__grid">
        {products.map(({ node: product }) => (
          <Link
            to={generateProductUrl(product.id, product.name)}
            key={product.id}
          >
            <ProductListItem product={product} key={product.id} />
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default OtherProducts;
