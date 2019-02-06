import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { CheckoutContextInterface } from "../../checkout/context";
import { baseUrl as checkoutUrl } from "../../checkout/routes";
import { Button, CartTable, EmptyCart, Loader } from "../../components";
import { checkoutLoginUrl } from "../../components/App/routes";
import { CartInterface } from "../../components/CartProvider/context";
import {
  extractCartLines,
  extractCheckoutLines,
  getTotal
} from "../../components/CartProvider/uitls";
import {
  OverlayContextInterface,
  OverlayType
} from "../../components/Overlay/context";
import { getShop_shop } from "../../components/ShopProvider/types/getShop";
import { UserContext } from "../../components/User/context";
import { maybe, priceToString } from "../../core/utils";
import { TypedProductVariantsQuery } from "../Product/queries";

interface PageProps {
  checkout: CheckoutContextInterface;
  overlay: OverlayContextInterface;
  cart: CartInterface;
  shop: getShop_shop;
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
      shop: { geolocalization, defaultCountry },
      checkout: { checkout, loading: checkoutLoading },
      cart: {
        lines,
        remove,
        add,
        errors,
        subtract,
        loading: cartLoading,
        changeQuantity
      }
    } = this.props;

    if (!checkout) {
      if (checkoutLoading) {
        return <Loader full />;
      }

      if (!lines.length) {
        return <EmptyCart />;
      }
    }

    const productTableProps = {
      add,
      changeQuantity,
      invalid: maybe(() => !!errors.length, false),
      processing: cartLoading,
      remove,
      subtract
    };
    const locale = maybe(
      () => geolocalization.country.code,
      defaultCountry.code
    );

    return (
      <>
        {checkout ? (
          <CartTable
            {...productTableProps}
            lines={extractCheckoutLines(checkout.lines)}
            subtotal={checkout.subtotalPrice.gross.localized}
          />
        ) : (
          <TypedProductVariantsQuery
            variables={{ ids: lines.map(line => line.variantId) }}
          >
            {({ data }) => {
              return (
                <CartTable
                  {...productTableProps}
                  lines={extractCartLines(data, lines, locale)}
                  subtotal={getTotal(data, lines, locale)}
                />
              );
            }}
          </TypedProductVariantsQuery>
        )}

        <div className="cart-page__checkout-action">
          <UserContext.Consumer>
            {({ user }) => (
              <Link to={user ? checkoutUrl : checkoutLoginUrl}>
                <Button disabled={cartLoading}>Proceed to Checkout</Button>
              </Link>
            )}
          </UserContext.Consumer>
        </div>
      </>
    );
  }
}

export default Page;
