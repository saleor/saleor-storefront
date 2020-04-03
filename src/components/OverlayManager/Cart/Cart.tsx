import "./scss/index.scss";

import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { useCart, useUserDetails } from "@sdk/react";

import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import { cartUrl, checkoutLoginUrl } from "../../../app/routes";
import { baseUrl as checkoutUrl } from "../../../checkout/routes";
import { maybe } from "../../../core/utils";
import { ShopContext } from "../../ShopProvider/context";
import Empty from "./Empty";
import ProductList from "./ProductList";

import cartImg from "../../../images/cart.svg";
import closeImg from "../../../images/x.svg";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const { data: user } = useUserDetails();
  const { items, removeItem, subtotalPrice } = useCart();

  return (
    <Overlay context={overlay}>
      <Online>
        {/* <CartContext.Consumer>
          {cart => ( */}
        <ShopContext.Consumer>
          {({ defaultCountry, geolocalization }) => {
            /* <TypedProductVariantsQuery
                  displayLoader={false}
                  variables={{ ids: items.map(item => item.variant.id) }}
                  skip={!items.length}
                  alwaysRender
                >
                  // {({ data, loading, error }) => {*/
            //   if (loading) {
            //     return (
            //       <div className="cart">
            //         <Loader full />
            //       </div>
            //     );
            //   }

            //   if (error) {
            //     return <Error error={error.message} />;
            //   }

            const locale = maybe(
              () => geolocalization.country.code,
              defaultCountry.code
            );
            return (
              <div className="cart">
                <div className="overlay__header">
                  <ReactSVG
                    path={cartImg}
                    className="overlay__header__cart-icon"
                  />
                  <div className="overlay__header-text">
                    My bag,{" "}
                    <span className="overlay__header-text-items">
                      {items.reduce(
                        (prevVal, currVal) => prevVal + currVal.quantity,
                        0
                      ) || 0}{" "}
                      items
                    </span>
                  </div>
                  <ReactSVG
                    path={closeImg}
                    onClick={overlay.hide}
                    className="overlay__header__close-icon"
                  />
                </div>
                {items.length ? (
                  <>
                    <ProductList lines={items} remove={removeItem} />
                    <div className="cart__footer">
                      <div className="cart__footer__subtotoal">
                        <span>Subtotal</span>

                        <span>
                          <TaxedMoney
                            data-cy="cartPageSubtotalPrice"
                            taxedMoney={subtotalPrice || undefined}
                          />
                        </span>
                      </div>

                      <div className="cart__footer__button">
                        <Link
                          to={generatePath(cartUrl, {
                            token: null,
                          })}
                        >
                          <Button secondary>Go to my bag</Button>
                        </Link>
                      </div>
                      <div className="cart__footer__button">
                        <Link to={user ? checkoutUrl : checkoutLoginUrl}>
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
            /*   }}
                </TypedProductVariantsQuery>*/
          }}
        </ShopContext.Consumer>
        {/* )}
        </CartContext.Consumer> */}
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
