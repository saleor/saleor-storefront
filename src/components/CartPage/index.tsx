import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import ReactSVG from "react-svg";

import { Button, Loader } from "..";
import { priceToString } from "../../core/utils";
import { CartContext } from "../CartProvider/context";
import { GET_CHECKOUT } from "../CheckoutPage/queries";

import "./scss/index.scss";

const CartPage: React.SFC<RouteComponentProps<{ token }>> = ({
  match: {
    params: { token = "" }
  }
}) => {
  return (
    <div className="container cart">
      <h1 className="checkout__header cart__header">Shopping cart</h1>
      <Query query={GET_CHECKOUT} variables={{ token }}>
        {({ loading, error, data: { checkout } }) => {
          const lines = checkout
            ? checkout.lines.edges.map(edge => edge.node)
            : [];
          if (loading) {
            return <Loader />;
          }
          if (error) {
            return `Error!: ${error}`;
          }
          return (
            <>
              <table className="cart__table">
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {lines.map(line => (
                    <tr key={line.id}>
                      <td>
                        <img
                          width={50}
                          src={
                            "http://localhost:8000" +
                            line.variant.product.thumbnailUrl
                          }
                        />
                        {line.variant.product.name}
                        {line.variant.name ? `(${line.variant.name})` : null}
                      </td>
                      <td>{priceToString(line.variant.price)}</td>
                      <td>{line.quantity}</td>
                      <td>
                        {priceToString({
                          amount: line.totalPrice.gross.amount,
                          currency: line.totalPrice.currency
                        })}
                      </td>
                      <td>
                        <CartContext.Consumer>
                          {({ remove }) => (
                            <ReactSVG
                              path="../../images/garbage.svg"
                              className="cart__list__item__details__delete-icon"
                              onClick={() => remove(line.variant.id)}
                            />
                          )}
                        </CartContext.Consumer>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="cart__table__subtotal">Subtotal</td>
                    <td />
                    <td />
                    <td>
                      {checkout
                        ? priceToString({
                            amount: checkout.subtotalPrice.gross.amount,
                            currency: checkout.subtotalPrice.currency
                          })
                        : null}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
              <div className="cart__checkout-action">
                <Button>Proceed to checkout</Button>
              </div>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default CartPage;
