import * as React from "react";

import { maybe } from "../../core/utils";

import { Omit } from "../../core/tsUtils";
import noPhotoImg from "../../images/no-photo.svg";
import { LineI } from "../../views/Cart/ProductRow";

const Line: React.FC<Omit<LineI, "totalPrice">> = ({
  id,
  product,
  price,
  name,
  quantity
}) => (
  <div key={id} className="cart-summary__product-item">
    <img src={maybe(() => product.thumbnail.url, noPhotoImg)} />
    <div>
      <p>{price.localized}</p>
      <p>{product.name}</p>
      <div className="cart-summary__product-item__details">
        <span>{name ? `(${name})` : null}</span>
        <span>Qty: {quantity}</span>
      </div>
    </div>
  </div>
);

export default Line;
