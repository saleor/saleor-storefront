import * as React from "react";

import { ProductListItemInterface } from "../../core/types";

import "./scss/index.scss";
interface ProductListItemProps {
  product: ProductListItemInterface;
  locale?: string;
}

const ProductListItem: React.SFC<ProductListItemProps> = ({
  product: { name, category, price, thumbnailUrl },
  locale
}) => (
  <div className="product-list-item">
    <img src={thumbnailUrl} />
    <h4 className="product-list-item__title">{name}</h4>
    <p className="product-list-item__category">{category.name}</p>
    <p className="product-list-item__price">
      {locale
        ? price.amount.toLocaleString(locale, {
            currency: price.currency,
            style: "currency"
          })
        : `${price.currency} ${price.amount}`}
    </p>
  </div>
);

export default ProductListItem;
