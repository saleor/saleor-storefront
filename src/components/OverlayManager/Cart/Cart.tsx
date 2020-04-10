import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { useUserDetails } from "@sdk/react";

import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import { checkoutLoginUrl } from "../../../app/routes";
import { baseUrl as checkoutUrl } from "../../../checkout/routes";
import { maybe } from "../../../core/utils";
import { TypedProductVariantsQuery } from "../../../views/Product/queries";
import { CartContext } from "../../CartProvider/context";
import { extractCartLines, getTotal } from "../../CartProvider/utils";
import { Error } from "../../Error";
import Loader from "../../Loader";
import { ShopContext } from "../../ShopProvider/context";
import Empty from "./Empty";
import ProductList from "./ProductList";

// import cartImg from "../../../images/cart.svg";
// import chevronDownImg from "../../../images/chevron-down.svg";
import chevronUpImg from "../../../images/chevron-up.svg";
import closeImg from "../../../images/x.svg";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const { data: user } = useUserDetails();
  return (
    <Overlay context={overlay}>
      <Online>
        <CartContext.Consumer>
          {cart => (
            <ShopContext.Consumer>
              {({ defaultCountry, geolocalization }) => (
                <TypedProductVariantsQuery
                  displayLoader={false}
                  variables={{ ids: cart.lines.map(line => line.variantId) }}
                  skip={!cart.lines.length}
                  alwaysRender
                >
                  {({ data, loading, error }) => {
                    if (loading) {
                      return (
                        <div className="cart">
                          <Loader full />
                        </div>
                      );
                    }

                    if (error) {
                      return <Error error={error.message} />;
                    }

                    const locale = maybe(
                      () => geolocalization.country.code,
                      defaultCountry.code
                    );
                    return (
                      <div className="cart">
                        <div className="overlay__header">
                          <ReactSVG
                            path={closeImg}
                            onClick={overlay.hide}
                            className="overlay__header__close-icon"
                          />
                        </div>
                        {cart.lines.length && data ? (
                          <>
                            <ProductList
                              lines={extractCartLines(data, cart.lines, locale)}
                              remove={cart.remove}
                            />
                            <div className="cart__footer">
                              <div className="cart__footer__subtotoal">
                                <span className="cart__footer__price-label">
                                  Total
                                  <br />
                                  (X items)
                                </span>
                                <span className="cart__footer__price">
                                  {getTotal(data, cart.lines, locale)}
                                </span>
                                <ReactSVG
                                  path={chevronUpImg}
                                  className="cart__footer__chevron-icon"
                                />
                              </div>
                              <div className="cart__footer__button">
                                <Link
                                  to={user ? checkoutUrl : checkoutLoginUrl}
                                >
                                  <Button>Checkout</Button>
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Empty overlayHide={overlay.hide} />
                        )}
                      </div>
                    );
                  }}
                </TypedProductVariantsQuery>
              )}
            </ShopContext.Consumer>
          )}
        </CartContext.Consumer>
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
