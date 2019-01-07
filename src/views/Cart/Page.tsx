import { smallScreen } from "../../components/App/scss/variables.scss";
import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { Button, Loader, TextField } from "../../components";
import { checkoutLoginUrl } from "../../components/App/routes";
import CachedImage from "../../components/CachedImage";
import { CartContext } from "../../components/CartProvider/context";
import { getCheckout_checkout } from "../../components/CheckoutApp/types/getCheckout";
import { EmptyCart } from "../../components/EmptyCart";
import { GoToCheckout } from "../../components/GoToCheckout";
import { UserContext } from "../../components/User/context";
import { maybe } from "../../core/utils";

const noPhotoPng = require("../../images/nophoto.png");
const cartRemoveSvg = require("../../images/cart-remove.svg");
const cartAddSvg = require("../../images/cart-add.svg");
const cartSubtractSvg = require("../../images/cart-subtract.svg");

const Page: React.SFC<{ checkout: getCheckout_checkout }> = ({ checkout }) => {
  const { lines } = checkout;

  if (lines.length > 0) {
    return (
      <Media query={{ minWidth: smallScreen }}>
        {isTabletUp => (
          <>
            <table className="cart-page__table">
              <thead>
                <tr>
                  <th>Products</th>
                  {isTabletUp && <th>Price</th>}
                  <th className="cart-page__table__quantity-header">
                    Quantity
                  </th>
                  <th>{isTabletUp ? "Total Price" : "Price"}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <CartContext.Consumer>
                  {({ remove, add, subtract, loading, changeQuantity }) =>
                    lines
                      .sort((a, b) =>
                        b.id.toLowerCase().localeCompare(a.id.toLowerCase())
                      )
                      .map(line => (
                        <tr key={line.id}>
                          <td className="cart-page__thumbnail">
                            {isTabletUp && (
                              <CachedImage
                                url={maybe(
                                  () => line.variant.product.thumbnail.url,
                                  noPhotoPng
                                )}
                                url2x={maybe(
                                  () => line.variant.product.thumbnail2x.url
                                )}
                              />
                            )}
                            {line.variant.product.name}
                            {line.variant.name
                              ? ` (${line.variant.name})`
                              : null}
                          </td>
                          {isTabletUp && (
                            <td>{line.variant.price.localized}</td>
                          )}
                          <td
                            className={classNames(
                              "cart-page__table__quantity-cell",
                              {
                                "cart-page__table__quantity-cell--processing": loading
                              }
                            )}
                          >
                            {isTabletUp ? (
                              <div>
                                <ReactSVG
                                  path={cartAddSvg}
                                  onClick={() => add(line.variant.id)}
                                />
                                <p>{line.quantity}</p>
                                <ReactSVG
                                  path={cartSubtractSvg}
                                  onClick={() => subtract(line.variant.id)}
                                />
                              </div>
                            ) : (
                              <TextField
                                type="number"
                                value={line.quantity}
                                onChange={evt =>
                                  changeQuantity(
                                    line.variant.id,
                                    parseInt(evt.target.value, 10)
                                  )
                                }
                              />
                            )}
                          </td>
                          <td>{line.totalPrice.gross.localized}</td>
                          <td>
                            <ReactSVG
                              path={cartRemoveSvg}
                              onClick={() => remove(line.variant.id)}
                            />
                          </td>
                        </tr>
                      ))
                  }
                </CartContext.Consumer>
              </tbody>
              <tfoot>
                <tr>
                  <td className="cart-page__table__subtotal">Subtotal</td>
                  {isTabletUp && <td />}
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
                          Proceed to Checkout{" "}
                        </GoToCheckout>
                      )}
                    </ApolloConsumer>
                  ) : (
                    <Link to={checkoutLoginUrl}>
                      <Button>Proceed to Checkout</Button>
                    </Link>
                  )
                }
              </UserContext.Consumer>
            </div>
          </>
        )}
      </Media>
    );
  } else {
    return <EmptyCart />;
  }
};

export default Page;
