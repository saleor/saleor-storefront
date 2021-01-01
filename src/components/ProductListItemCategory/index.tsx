import "./scss/index.scss";

import * as React from "react";

import { usePreferences } from "@hooks";
import { Thumbnail } from "@components/molecules";

import { FeaturedProducts_shop_homepageCollection_products_edges_node } from "../ProductsFeatured/gqlTypes/FeaturedProducts";

interface ProductListItemProps {
  product: FeaturedProducts_shop_homepageCollection_products_edges_node;
}

const ProductListItemCategory: React.FC<ProductListItemProps> = ({
  product,
}) => {
  const { category } = product;

  const {
    preferences: { locale },
  } = usePreferences();

  return (
    <div className="product-list-item">
      <div className="product-list-item__image">
        <Thumbnail source={product} />
      </div>
      <p className="product-list-item__category">
        {locale === "en" && category.translation?.name
          ? category.translation.name
          : category.name}
      </p>
    </div>
  );
};

export default ProductListItemCategory;
