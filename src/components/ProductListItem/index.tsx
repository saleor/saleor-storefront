import "./scss/index.scss";

import * as React from "react";

import { maybe } from "../../core/utils";
import { BasicProductFields } from "../../views/Product/types/BasicProductFields";
import CachedImage from "../CachedImage";

const noPhoto = require("../../images/nophoto.png");

export interface Product extends BasicProductFields {
  category?: {
    id: string;
    name: string;
  };
  price: {
    localized: string;
  }
}

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.SFC<ProductListItemProps> = ({
  product: { name, category, price, thumbnail, thumbnail2x }
}) => {
  const thumbnail2xUrl = maybe(() => thumbnail2x.url, undefined)
  return (
    <div className="product-list-item">
      <div className="product-list-item__image">
        <CachedImage url={thumbnail.url} url2x={thumbnail2xUrl}>
          <img src={noPhoto} alt={thumbnail.alt} />
        </CachedImage>
      </div>
      <h4 className="product-list-item__title">{name}</h4>
      <p className="product-list-item__category">{category.name}</p>
      <p className="product-list-item__price">{price.localized}</p>
    </div>
  );
};

export default ProductListItem;
