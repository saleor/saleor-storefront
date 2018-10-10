import * as React from "react";

import { priceToString } from "../../core/utils";
import { CheckoutContext } from "../CheckoutApp/context";

import "./scss/index.scss";

const CartSummary: React.SFC<{}> = () => (
  <CheckoutContext.Consumer>
    {({ checkout }) =>
      checkout ? (
        <div className="cart-summary">
          <p className="cart-summary__header">Cart summary</p>
          {checkout.lines.map(product => (
            <div key={product.id} className="cart-summary__product-item">
              <img src={product.variant.product.thumbnailUrl} />
              <div>
                <p>{priceToString(product.variant.price)}</p>
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
            <h4>
              {checkout.subtotalPrice
                ? priceToString({
                    amount: checkout.subtotalPrice.gross.amount,
                    currency: checkout.subtotalPrice.currency
                  })
                : "-"}
            </h4>
          </div>
          <div className="cart-summary__totals">
            <h4>Delivery</h4>
            <h4>
              {checkout.shippingPrice
                ? priceToString({
                    amount: checkout.shippingPrice.gross.amount,
                    currency: checkout.shippingPrice.currency
                  })
                : "-"}
            </h4>
          </div>
          <div className="cart-summary__totals last">
            <h4>Grand total</h4>
            <h4>
              {checkout.totalPrice
                ? priceToString({
                    amount: checkout.totalPrice.gross.amount,
                    currency: checkout.totalPrice.currency
                  })
                : "-"}
            </h4>
          </div>
        </div>
      ) : null
    }
  </CheckoutContext.Consumer>
);

export default CartSummary;
