import * as React from "react";
import { Query } from "react-apollo";
import Media from "react-media";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { Button, Loader } from "..";
import { priceToString } from "../../core/utils";
import { CartContext } from "../CartProvider/context";
import { GET_CHECKOUT } from "../CheckoutApp/queries";
import { checkoutBaseUrl } from "../CheckoutApp/routes";
import { UserContext } from "../User/context";

import { smallScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

const CartPage: React.SFC<RouteComponentProps<{ token }>> = ({
  match: {
    params: { token = "" }
  }
}) => {
  return (
    <div className="container cart-page">
      <h1 className="checkout__header cart-page__header">Shopping cart</h1>
      <Query query={GET_CHECKOUT} variables={{ token }}>
        {({ loading, error, data: { checkout } }) => {
          const lines = checkout ? checkout.lines : [];
          if (loading) {
            return <Loader />;
          }
          if (error) {
            return `Error!: ${error}`;
          }
          if (lines.length > 0) {
            return (
              <>
                <table className="cart-page__table">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <Media query={{ minWidth: smallScreen }}>
                        {matches => (matches ? <th>Price</th> : null)}
                      </Media>
                      <th>Quantity</th>
                      <th>
                        <Media query={{ minWidth: smallScreen }}>
                          {matches => (matches ? "Total Price" : "Price")}
                        </Media>
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map(line => (
                      <tr key={line.id}>
                        <td>
                          <Media
                            query={{ minWidth: smallScreen }}
                            render={() => (
                              <img
                                width={50}
                                src={line.variant.product.thumbnailUrl}
                              />
                            )}
                          />
                          {line.variant.product.name}
                          {line.variant.name ? `(${line.variant.name})` : null}
                        </td>
                        <Media query={{ minWidth: smallScreen }}>
                          {matches =>
                            matches ? (
                              <td>{priceToString(line.variant.price)}</td>
                            ) : null
                          }
                        </Media>
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
                      <td className="cart-page__table__subtotal">Subtotal</td>
                      <Media query={{ minWidth: smallScreen }}>
                        {matches => (matches ? <td /> : null)}
                      </Media>
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
                <div className="cart-page__checkout-action">
                  <UserContext.Consumer>
                    {({ user }) => (
                      <Link to={user ? checkoutBaseUrl : "/login/"}>
                        <Button>Checkout</Button>
                      </Link>
                    )}
                  </UserContext.Consumer>
                </div>
              </>
            );
          } else {
            return (
              <div className="cart-page__empty">
                <h4>Yor bag is empty</h4>
                <p>
                  You haven’t added anything to your bag. We’re sure you’ll find
                  something in our store
                </p>
                <div className="cart-page__empty__action">
                  <Link to={"/"}>
                    <Button secondary>Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            );
          }
        }}
      </Query>
    </div>
  );
};

export default CartPage;
