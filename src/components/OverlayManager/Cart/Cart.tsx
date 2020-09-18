import "./scss/index.scss";

import * as React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath, Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { commonMessages } from "@temp/intl";
import { useAuth, useCart, useCheckout } from "@saleor/sdk";

import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import { cartUrl, checkoutLoginUrl, checkoutUrl } from "../../../app/routes";
import Loader from "../../Loader";
import Empty from "./Empty";
import ProductList from "./ProductList";

import cartImg from "../../../images/cart.svg";
import closeImg from "../../../images/x.svg";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const { user } = useAuth();
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

  const missingVariants = () => {
    return items.find(item => !item.variant || !item.totalPrice);
  };

  const itemsQuantity =
    items?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) || 0;

  return (
    <Overlay testingContext="cartOverlay" context={overlay}>
      <Online>
        <div className="cart">
          <div className="overlay__header">
            <ReactSVG path={cartImg} className="overlay__header__cart-icon" />
            <div className="overlay__header-text">
              <FormattedMessage defaultMessage="My bag," />{" "}
              <span className="overlay__header-text-items">
                <FormattedMessage
                  defaultMessage="{itemsQuantity,plural,one{{itemsQuantity} item} other{{itemsQuantity} items}}"
                  description="items quantity in cart"
                  values={{
                    itemsQuantity,
                  }}
                />
              </span>
            </div>
            <ReactSVG
              path={closeImg}
              onClick={overlay.hide}
              className="overlay__header__close-icon"
            />
          </div>
          {items?.length ? (
            <>
              {missingVariants() ? (
                <Loader full />
              ) : (
                <>
                  <ProductList lines={items} remove={removeItem} />
                  <div className="cart__footer">
                    <div className="cart__footer__price">
                      <span>
                        <FormattedMessage {...commonMessages.subtotal} />
                      </span>
                      <span>
                        <TaxedMoney
                          data-test="subtotalPrice"
                          taxedMoney={subtotalPrice}
                        />
                      </span>
                    </div>

                    {shippingTaxedPrice &&
                      shippingTaxedPrice.gross.amount !== 0 && (
                        <div className="cart__footer__price">
                          <span>
                            <FormattedMessage {...commonMessages.shipping} />
                          </span>
                          <span>
                            <TaxedMoney
                              data-test="shippingPrice"
                              taxedMoney={shippingTaxedPrice}
                            />
                          </span>
                        </div>
                      )}

                    {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                      <div className="cart__footer__price">
                        <span>
                          <FormattedMessage {...commonMessages.promoCode} />
                        </span>
                        <span>
                          <TaxedMoney
                            data-test="promoCodePrice"
                            taxedMoney={promoTaxedPrice}
                          />
                        </span>
                      </div>
                    )}

                    <div className="cart__footer__price">
                      <span>
                        <FormattedMessage {...commonMessages.total} />
                      </span>
                      <span>
                        <TaxedMoney
                          data-test="totalPrice"
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
                        <Button testingContext="gotoBagViewButton" secondary>
                          <FormattedMessage defaultMessage="Go to my bag" />
                        </Button>
                      </Link>
                    </div>
                    <div className="cart__footer__button">
                      <Link to={user ? checkoutUrl : checkoutLoginUrl}>
                        <Button testingContext="gotoCheckoutButton">
                          <FormattedMessage {...commonMessages.checkout} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
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
