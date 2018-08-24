import * as React from "react";

import "./scss/index.scss";


type ProductListItemProps = {
  title: string,
  category: string,
  price: string,
  thumbnaillUrl: string,
  currency: string,
}

const ProductListItem: React.SFC<ProductListItemProps> = ({ title, category, price, thumbnaillUrl,
  currency }) => (
  <div className="product-list-item">
    <img src={thumbnaillUrl}/>
    <h4 className="product-list-item__title">{title}</h4>
    <p className="product-list-item__category">{category}</p>
    <p className="product-list-item__price">{currency}{price}</p>
  </div>
);

export default ProductListItem;
