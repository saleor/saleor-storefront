import "./scss/index.scss";

import * as React from "react";

import { maybe } from "../../core/utils";
import CachedImage from "../CachedImage";
import { ProductNodeFragment } from "./types/ProductNodeFragment";

interface Product extends ProductNodeFragment {
  category?: {
    id: string;
    name: string;
  };
  collections?: Array<{
    id: string;
    name: string;
  }>;
}

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.SFC<ProductListItemProps> = ({
  product: { name, collections, category, price, thumbnailUrl, thumbnailUrl2x }
}) => {
  const categoryOrCollecton = maybe(() => collections[0].name || category.name);

  return (
    <div className="product-list-item">
      <div className="product-list-item__image">
        <CachedImage url={thumbnailUrl} url2x={thumbnailUrl2x}>
          <img src={require("../../images/nophoto.png")} />
        </CachedImage>
      </div>
      <h4 className="product-list-item__title">{name}</h4>
      <p className="product-list-item__category">
        {categoryOrCollecton}
      </p>
      <p className="product-list-item__price">{price.localized}</p>
    </div>
  );
};

export default ProductListItem;
