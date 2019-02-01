import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { CheckoutContextInterface } from "../../checkout/context";
import { baseUrl as checkoutUrl } from "../../checkout/routes";
import { Button, EmptyCart, Loader } from "../../components";
import { checkoutLoginUrl } from "../../components/App/routes";
import { CartInterface } from "../../components/CartProvider/context";
import {
  extractCartLines,
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
import { VariantList } from "../Product/types/VariantList";
import ProductsTable from "./ProductsTable";

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

  extractCheckoutLines() {
    return this.props.checkout.checkout.lines.map(line => ({
      quantity: line.quantity,
      totalPrice: line.totalPrice.gross.localized,
      ...line.variant
    }));
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

    if (!checkout && checkoutLoading) {
      return <Loader full />;
    }

    if (!checkout && !lines.length) {
      return <EmptyCart />;
    }

    const productTableProps = {
      add,
      cartLoading,
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
          <ProductsTable
            {...productTableProps}
            subtotal={checkout.subtotalPrice.gross.localized}
            lines={this.extractCheckoutLines()}
          />
        ) : (
          <TypedProductVariantsQuery
            variables={{ ids: lines.map(line => line.variantId) }}
          >
            {({ data }) => {
              return (
                <ProductsTable
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
                <Button>Proceed to Checkout</Button>
              </Link>
            )}
          </UserContext.Consumer>
        </div>
      </>
    );
  }
}

export default Page;
