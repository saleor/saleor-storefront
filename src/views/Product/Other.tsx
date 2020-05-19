import * as React from "react";

import { ProductList } from "@components/organisms";

import { ProductDetails_product_category_products_edges } from "./gqlTypes/ProductDetails";

import { useIntl } from "react-intl"

const OtherProducts: React.FC<{
  products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => {
  const intl = useIntl();

  return(
  <div className="product-page__other-products">
    <div className="container">
      <h4 className="product-page__other-products__title">
        {
          intl.formatMessage({
          defaultMessage: "Other products in this category",
          })
        }
      </h4>
      <ProductList products={products.map(({ node }) => node)} />
    </div>
  </div>
)};

export default OtherProducts;
