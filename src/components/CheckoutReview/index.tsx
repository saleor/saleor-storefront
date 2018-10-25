import * as React from "react";
import { Mutation } from "react-apollo";
import Media from "react-media";
import { RouteComponentProps } from "react-router";

import { AddressSummary, Button } from "..";
import { removeAuthToken } from "../../core/auth";
import { priceToString } from "../../core/utils";
import { CheckoutContext } from "../CheckoutApp/context";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { COMPLETE_CHECKOUT } from "./queries";

import { smallScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

class CheckoutReview extends React.Component<RouteComponentProps<{ id }>, {}> {
  render() {
    return (
      <CheckoutContext.Consumer>
        {({ cardData, checkout }) => (
          <div className="checout-review">
            <div className="checkout__step">
              <span>5</span>
              <h4 className="checkout__header">Review your order</h4>
            </div>
            <div className="checout-review__content">
              <table className="cart__table">
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
                  {checkout.lines.map(line => (
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
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="cart__table__subtotal">Subtotal</td>
                    <Media query={{ minWidth: smallScreen }}>
                      {matches => (matches ? <td /> : null)}
                    </Media>
                    <td />
                    <td>
                      {priceToString({
                        amount: checkout.subtotalPrice.gross.amount,
                        currency: checkout.subtotalPrice.currency
                      })}
                    </td>
                    <td />
                  </tr>
                  <tr>
                    <td className="cart__table__subtotal">Delivery cost</td>
                    <Media query={{ minWidth: smallScreen }}>
                      {matches => (matches ? <td /> : null)}
                    </Media>
                    <td />
                    <td>
                      +
                      {priceToString({
                        amount: checkout.shippingPrice.gross.amount,
                        currency: checkout.shippingPrice.currency
                      })}
                    </td>
                    <td />
                  </tr>
                  <tr>
                    <td className="cart__table__subtotal">Total Cost</td>
                    <Media query={{ minWidth: smallScreen }}>
                      {matches => (matches ? <td /> : null)}
                    </Media>
                    <td />
                    <td>
                      {priceToString({
                        amount: checkout.totalPrice.gross.amount,
                        currency: checkout.totalPrice.currency
                      })}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
              <div className="checout-review__content__summary">
                <div>
                  <h4>Shipping address</h4>
                  <AddressSummary
                    address={checkout.shippingAddress}
                    email={checkout.email}
                  />
                </div>
                <div>
                  <h4>Billing address</h4>
                  <AddressSummary address={checkout.billingAddress} />
                </div>
                <div>
                  <h4>Shipping method</h4>
                  {checkout.shippingMethod.name}
                </div>
                <div>
                  <h4>Payment method</h4>
                  Ending in {cardData.lastDigits}
                </div>
              </div>
              <div className="checout-review__content__submit">
                <OverlayContext.Consumer>
                  {({ show }) => (
                    <Mutation mutation={COMPLETE_CHECKOUT}>
                      {(completeCheckout, { data, loading }) => {
                        if (data && data.checkoutComplete.errors.length === 0) {
                          this.props.history.push(`/`);
                          removeAuthToken();
                          show(OverlayType.message, null, {
                            status: "error",
                            title: "Your order was placed"
                          });
                        } else {
                          data.checkoutComplete.errors.map(error => {
                            show(OverlayType.message, null, {
                              title: error.message
                            });
                          });
                        }
                        return (
                          <Button
                            disabled={loading}
                            onClick={() =>
                              completeCheckout({
                                variables: {
                                  checkoutId: checkout.id
                                }
                              })
                            }
                          >
                            {loading ? "Loading" : "Place your order"}
                          </Button>
                        );
                      }}
                    </Mutation>
                  )}
                </OverlayContext.Consumer>
              </div>
            </div>
          </div>
        )}
      </CheckoutContext.Consumer>
    );
  }
}

export default CheckoutReview;
