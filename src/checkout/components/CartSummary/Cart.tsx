import * as React from "react";

import { Money } from "@components/containers";

import { CartInterface } from "../../../components/CartProvider/context";
import { TypedProductVariantsQuery } from "../../../views/Product/queries";
import { Checkout } from "../../types/Checkout";
import Line from "./Line";
import Subtotal from "./Subtotal";

const Cart: React.FC<{
  cart: CartInterface;
  checkout: Checkout | null;
}> = ({ cart: { lines }, checkout }) => {
  return (
    <div className="cart-summary">
      <p className="cart-summary__header">Cart summary</p>
      {!checkout ? (
        <TypedProductVariantsQuery
          variables={{ ids: lines.map(line => line.variantId) }}
        >
          {({ data }) => (
            <>
              {data.productVariants.edges.map(({ node }) => (
                <Line
                  key={node.id}
                  {...node}
                  quantity={
                    lines.find(({ variantId }) => variantId === node.id)
                      .quantity
                  }
                />
              ))}
              <Subtotal checkout={checkout} variants={data} lines={lines} />
            </>
          )}
        </TypedProductVariantsQuery>
      ) : (
        <>
          {checkout.lines.map(({ variant, quantity, id }) => (
            <Line key={id} {...variant} quantity={quantity} />
          ))}
          <Subtotal checkout={checkout} lines={lines} />
          {checkout.discount && !!checkout.discount.amount && (
            <div className="cart-summary__totals">
              <h5>Discount: {checkout.discountName}</h5>
              <h5>
                - <Money defaultValue="-" money={checkout.discount} />
              </h5>
            </div>
          )}
          <div className="cart-summary__totals">
            <h5>Delivery</h5>
            <h5>
              <Money defaultValue="-" money={checkout.shippingPrice.gross} />
            </h5>
          </div>
          <div className="cart-summary__totals last">
            <h4>Grand total</h4>
            <h4>
              <Money defaultValue="-" money={checkout.totalPrice.gross} />
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
