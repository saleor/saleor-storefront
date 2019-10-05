import * as React from "react";

import { LineI } from "../../../components/CartTable/ProductRow";
import { maybe } from "../../../core/utils";

import noPhotoImg from "../../../images/no-photo.svg";

const Line: React.FC<Omit<LineI, "totalPrice">> = ({
  id,
  product,
  pricing,
  name,
  quantity,
}) => (
  <div key={id} className="cart-summary__product-item">
    <img src={maybe(() => product.thumbnail.url, noPhotoImg)} />
    <div>
      <p>{pricing.price.gross.localized}</p>
      <p>{product.name}</p>
      <div className="cart-summary__product-item__details">
        <span>{name ? `(${name})` : null}</span>
        <span>Qty: {quantity}</span>
      </div>
    </div>
  </div>
);
export default Line;
