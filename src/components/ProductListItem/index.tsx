import * as React from "react";

import { ProductListItemInterface } from "../../core/types";
import CachedImage from "../CachedImage";

import "./scss/index.scss";

interface ProductListItemProps {
  product: ProductListItemInterface;
}

const ProductListItem: React.SFC<ProductListItemProps> = ({
  product: { name, category, price, thumbnailUrl, thumbnailUrl2x }
}) => (
  <div className="product-list-item">
    <CachedImage url={thumbnailUrl} url2x={thumbnailUrl2x}>
      <img src={require("../../images/nophoto.png")} />
    </CachedImage>
    <h4 className="product-list-item__title">{name}</h4>
    <p className="product-list-item__category">{category.name}</p>
    <p className="product-list-item__price">{price.localized}</p>
  </div>
);

export default ProductListItem;
