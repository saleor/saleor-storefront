import * as React from "react";

import { maybe } from "../../core/utils";
import { VariantList_productVariants_edges_node } from "../../views/Product/types/VariantList";

import { Checkout_lines_variant } from "../../checkout/types/Checkout";
import noPhotoImg from "../../images/no-photo.svg";

const Line: React.FC<
  (VariantList_productVariants_edges_node | Checkout_lines_variant) & {
    quantity: number;
  }
> = ({ id, product, price, name, quantity }) => (
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
