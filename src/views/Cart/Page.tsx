import "./scss/index.scss";

import * as React from "react";
import { ApolloConsumer, compose } from "react-apollo";
import { Link } from "react-router-dom";

import { Button } from "../../components";
import { checkoutLoginUrl } from "../../components/App/routes";
import { CartInterface } from "../../components/CartProvider/context";
import { getCheckout_checkout } from "../../components/CheckoutApp/types/getCheckout";
import { EmptyCart } from "../../components/EmptyCart";
import { GoToCheckout } from "../../components/GoToCheckout";
import {
  OverlayContextInterface,
  OverlayType
} from "../../components/Overlay/context";
import { UserContext } from "../../components/User/context";
import { maybe } from "../../core/utils";
import { withCart, withOverlay } from "../../hoc";
import ProductsTable from "./ProductsTable";

interface PageProps {
  checkout: getCheckout_checkout;
  overlay: OverlayContextInterface;
  cart: CartInterface;
}
class Page extends React.Component<PageProps> {
  shouldComponentUpdate(nextProps: PageProps) {
    const {
      cart: { errors, clearErrors },
      overlay: { show }
    } = nextProps;
    const hasErrors = maybe(() => !!errors.length);

    if (hasErrors) {
      show(OverlayType.message, null, {
        content: errors.map(err => err.message).join(", "),
        status: "error",
        title: "Error"
      });
      clearErrors();
    }
    return true;
  }

  render() {
    const {
      checkout,
      cart: { remove, add, errors, subtract, loading, changeQuantity }
    } = this.props;

    if (checkout.lines.length > 0) {
      return (
        <>
          <ProductsTable
            addToCart={add}
            changeQuantityInCart={changeQuantity}
            checkout={checkout}
            processing={loading}
            removeFromCart={remove}
            subtractToCart={subtract}
          />
          <div className="cart-page__checkout-action">
            <UserContext.Consumer>
              {({ user }) =>
                user ? (
                  <ApolloConsumer>
                    {client => (
                      <GoToCheckout disabled={loading} apolloClient={client}>
                        Proceed to Checkout{" "}
                      </GoToCheckout>
                    )}
                  </ApolloConsumer>
                ) : (
                  <Link to={checkoutLoginUrl}>
                    <Button disabled={loading}>Proceed to Checkout</Button>
                  </Link>
                )
              }
            </UserContext.Consumer>
          </div>
        </>
      );
    } else {
      return <EmptyCart />;
    }
  }
}

export default withOverlay(withCart(Page));
