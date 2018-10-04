import * as React from "react";

import { priceToString } from "../../core/utils";

import "./scss/index.scss";

const CartSummary: React.SFC<{
  products: any;
  subtotal: any;
  shippingPrice: any;
  total: any;
}> = ({ products, subtotal, shippingPrice, total }) => (
  <div className="cart-summary">
    <p className="cart-summary__header">Cart summary</p>
    {products.map(product => (
      <div key={product.id} className="cart-summary__product-item">
        <img
          src={"http://localhost:8000" + product.variant.product.thumbnailUrl}
        />
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
        {subtotal
          ? priceToString({
              amount: subtotal.gross.amount,
              currency: subtotal.currency
            })
          : "-"}
      </h4>
    </div>
    <div className="cart-summary__totals">
      <h4>Delivery</h4>
      <h4>
        {shippingPrice
          ? priceToString({
              amount: shippingPrice.gross.amount,
              currency: shippingPrice.currency
            })
          : "-"}
      </h4>
    </div>
    <div className="cart-summary__totals last">
      <h4>Grand total</h4>
      <h4>
        {total
          ? priceToString({
              amount: total.gross.amount,
              currency: total.currency
            })
          : "-"}
      </h4>
    </div>
  </div>
);

export default CartSummary;
