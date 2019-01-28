import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { baseUrl as checkoutUrl } from "../../checkout/routes";
import { getCheckout_checkout } from "../../checkout/types/getCheckout";
import { Button, EmptyCart } from "../../components";
import { checkoutLoginUrl } from "../../components/App/routes";
import { CartInterface } from "../../components/CartProvider/context";
import {
  OverlayContextInterface,
  OverlayType
} from "../../components/Overlay/context";
import { UserContext } from "../../components/User/context";
import { maybe } from "../../core/utils";
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
            invalid={maybe(() => !!errors.length, false)}
          />
          <div className="cart-page__checkout-action">
            <UserContext.Consumer>
              {({ user }) => (
                <Link to={user ? checkoutUrl : checkoutLoginUrl}>
                  <Button>Checkout</Button>
                </Link>
              )}
            </UserContext.Consumer>
          </div>
        </>
      );
    }
    return <EmptyCart />;
  }
}

export default Page;
