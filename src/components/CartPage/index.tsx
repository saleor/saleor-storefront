import * as React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import Media from "react-media";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { Button, Loader } from "..";
import { baseUrl, checkoutLoginUrl } from "../App/routes";
import { CartContext } from "../CartProvider/context";
import { GET_CHECKOUT } from "../CheckoutApp/queries";
import { GoToCheckout } from "../GoToCheckout";
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
      <Query
        query={GET_CHECKOUT}
        variables={{ token }}
        fetchPolicy="cache-and-network"
        errorPolicy="all"
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader full />;
          }
          if (error && !data) {
            return `Error!: ${error}`;
          }
          const { checkout } = data;
          const lines = checkout ? checkout.lines : [];
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
                          {line.variant.name ? ` (${line.variant.name})` : null}
                        </td>
                        <Media query={{ minWidth: smallScreen }}>
                          {matches =>
                            matches ? (
                              <td>{line.variant.price.localized}</td>
                            ) : null
                          }
                        </Media>
                        <td>{line.quantity}</td>
                        <td>{line.totalPrice.gross.localized}</td>
                        <td>
                          <CartContext.Consumer>
                            {({ remove }) => (
                              <ReactSVG
                                path={require("../../images/garbage.svg")}
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
                      <td>{checkout.subtotalPrice.gross.localized}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
                <div className="cart-page__checkout-action">
                  <UserContext.Consumer>
                    {({ user }) =>
                      user ? (
                        <ApolloConsumer>
                          {client => (
                            <GoToCheckout apolloClient={client}>
                              Checkout
                            </GoToCheckout>
                          )}
                        </ApolloConsumer>
                      ) : (
                        <Link to={checkoutLoginUrl}>
                          <Button>Checkout</Button>
                        </Link>
                      )
                    }
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
                  <Link to={baseUrl}>
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
