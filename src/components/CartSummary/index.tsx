import "./scss/index.scss";

import * as React from "react";

import { maybe } from "../../core/utils";
import { CheckoutContext } from "../CheckoutApp/context";

const noPhotoSvg = require("../../images/no-photo.svg");

const CartSummary: React.SFC = () => (
  <CheckoutContext.Consumer>
    {({ checkout }) =>
      checkout ? (
        <div className="cart-summary">
          <p className="cart-summary__header">Cart summary</p>
          {checkout.lines.map(product => (
            <div key={product.id} className="cart-summary__product-item">
              <img
                src={maybe(
                  () => product.variant.product.thumbnail.url,
                  noPhotoSvg
                )}
              />
              <div>
                <p>{product.variant.price.localized}</p>
                <p>{product.variant.product.name}</p>
                <div className="cart-summary__product-item__details">
                  <span>
                    {product.variant.name ? `(${product.variant.name})` : null}
                  </span>
                  <span>Qty: {product.quantity}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary__totals">
            <h4>Subtotal</h4>
            <h4>{checkout.subtotalPrice.gross.localized}</h4>
          </div>
          <div className="cart-summary__totals">
            <h4>Delivery</h4>
            <h4>
              {checkout.shippingPrice
                ? checkout.shippingPrice.gross.localized
                : "-"}
            </h4>
          </div>
          <div className="cart-summary__totals last">
            <h4>Grand total</h4>
            <h4>
              {checkout.totalPrice ? checkout.totalPrice.gross.localized : "-"}
            </h4>
          </div>
        </div>
      ) : null
    }
  </CheckoutContext.Consumer>
);

export default CartSummary;
