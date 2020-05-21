import "./scss/index.scss";

import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { useCart, useCheckout, useUserDetails } from "@sdk/react";

import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import { cartUrl, checkoutLoginUrl, checkoutUrl } from "../../../app/routes";
import Empty from "./Empty";
import ProductList from "./ProductList";

import cartImg from "../../../images/cart.svg";
import closeImg from "../../../images/x.svg";

import { FormattedMessage } from "react-intl";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const { data: user } = useUserDetails();
  const { checkout } = useCheckout();
  const {
    items,
    removeItem,
    subtotalPrice,
    shippingPrice,
    discount,
    totalPrice,
  } = useCart();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const numberOfItems = () =>{
    return items?.reduce(
      (prevVal, currVal) => prevVal + currVal.quantity,
      0
    ) || 0
  }
  return (
    <Overlay context={overlay}>
      <Online>
        <div className="cart">
          <div className="overlay__header">
            <ReactSVG path={cartImg} className="overlay__header__cart-icon" />
            <div className="overlay__header-text">
              <FormattedMessage
                defaultMessage={"My bag, "}
              />{" "}
              <span className="overlay__header-text-items">
                { numberOfItems() }{" "}
                <FormattedMessage
                  defaultMessage={" items"}
                />
              </span>
            </div>
            <ReactSVG
              path={closeImg}
              onClick={overlay.hide}
              className="overlay__header__close-icon"
            />
          </div>
          {
          items?.length ? (
            <>
              <ProductList lines={items} remove={removeItem} />
              <div className="cart__footer">
                <div className="cart__footer__price">
                  <span>
                    <FormattedMessage
                      defaultMessage={"Subtotal"}
                    />
                  </span>
                  <span>
                    <TaxedMoney
                      data-cy="cartPageSubtotalPrice"
                      taxedMoney={subtotalPrice}
                    />
                  </span>
                </div>

                {shippingTaxedPrice && shippingTaxedPrice.gross.amount !== 0 && (
                  <div className="cart__footer__price">
                    <span>
                    <FormattedMessage
                      defaultMessage={"Shipping"}
                    />
                    </span>
                    <span>
                      <TaxedMoney
                        data-cy="cartPageShippingPrice"
                        taxedMoney={shippingTaxedPrice}
                      />
                    </span>
                  </div>
                )}

                {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                  <div className="cart__footer__price">
                    <span>
                      <FormattedMessage
                        defaultMessage={"Promo code"}
                      />
                    </span>
                    <span>
                      <TaxedMoney
                        data-cy="cartPagePromoCodePrice"
                        taxedMoney={promoTaxedPrice}
                      />
                    </span>
                  </div>
                )}

                <div className="cart__footer__price">
                  <span>
                    <FormattedMessage
                      defaultMessage={"Total"}
                    />
                  </span>
                  <span>
                    <TaxedMoney
                      data-cy="cartPageTotalPrice"
                      taxedMoney={totalPrice}
                    />
                  </span>
                </div>

                <div className="cart__footer__button">
                  <Link
                    to={generatePath(cartUrl, {
                      token: null,
                    })}
                  >
                    <Button secondary>
                    <FormattedMessage
                        defaultMessage={"Go to my bag"}
                      />
                    </Button>
                  </Link>
                </div>
                <div className="cart__footer__button">
                  <Link to={user ? checkoutUrl : checkoutLoginUrl}>
                    <Button>
                      <FormattedMessage
                        defaultMessage={"Checkout"}
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <Empty overlayHide={overlay.hide} />
          )}
        </div>
      </Online>
      <Offline>
        <div className="cart">
          <OfflinePlaceholder />
        </div>
      </Offline>
    </Overlay>
  );
};

export default Cart;
