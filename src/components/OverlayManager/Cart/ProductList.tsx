import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { CachedThumbnail } from "../..";
import { generateProductUrl } from "../../../core/utils";
import { CartLineInterface } from "../../CartProvider/context";

import removeImg from "../../../images/garbage.svg";

const ProductList: React.SFC<{
  lines: CartLineInterface[];
  removeFromCart(variantId: string): void;
}> = ({ lines, removeFromCart }) => (
  <ul className="cart__list">
    {lines.map(line => {
      const productUrl = generateProductUrl(
        line.variant.product.id,
        line.variant.product.name
      );
      return (
        <li key={line.variant.id} className="cart__list__item">
          <Link to={productUrl}>
            <CachedThumbnail source={line.variant.product} />
          </Link>
          <div className="cart__list__item__details">
            <p>{line.variant.price.localized}</p>
            <Link to={productUrl}>
              <p>{line.variant.product.name}</p>
            </Link>
            <span className="cart__list__item__details__variant">
              <span>{line.variant.name}</span>
              <span>{`Qty: ${line.quantity}`}</span>
            </span>
            <ReactSVG
              path={removeImg}
              className="cart__list__item__details__delete-icon"
              onClick={() => removeFromCart(line.variant.id)}
            />
          </div>
        </li>
      );
    })}
  </ul>
);

export default ProductList;
