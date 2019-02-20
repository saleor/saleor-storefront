import "./scss/index.scss";

import { History } from "history";
import * as React from "react";
import { generatePath, Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import {
  Button,
  CartTable,
  OverlayContext,
  OverlayType,
  ShowOverlayType
} from "../../../components";
import { orderConfirmationUrl } from "../../../components/App/routes";
import { CartContext } from "../../../components/CartProvider/context";
import { extractCheckoutLines } from "../../../components/CartProvider/uitls";
import { UserContext } from "../../../components/User/context";
import { StepCheck } from "../../components";
import { CheckoutContext } from "../../context";
import { paymentUrl } from "../../routes";
import { TypedCompleteCheckoutMutation } from "./queries";
import Summary from "./Summary";
import { completeCheckout } from "./types/completeCheckout";

const completeCheckout = (
  data: completeCheckout,
  show: ShowOverlayType,
  history: History,
  guest: boolean,
  clearCheckout: () => void,
  clearCart: () => void
) => {
  const canProceed = !data.checkoutComplete.errors.length;

  if (canProceed) {
    const { id, token } = data.checkoutComplete.order;
    history.push({
      pathname: orderConfirmationUrl,
      state: guest ? { token } : { id }
    });
    clearCheckout();
    clearCart();
    show(OverlayType.message, null, {
      status: "success",
      title: "Your order was placed"
    });
  } else {
    data.checkoutComplete.errors.map(error => {
      show(OverlayType.message, null, {
        title: error.message
      });
    });
  }
};

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    path,
    params: { token }
  }
}) => (
  <CheckoutContext.Consumer>
    {({ cardData, dummyStatus, checkout, clear: clearCheckout, step }) => {
      const stepCheck = (
        <StepCheck checkout={checkout} step={step} path={path} token={token} />
      );

      if (!checkout) {
        return stepCheck;
      }
      return (
        <>
          {stepCheck}
          <div className="checkout-review">
            <Link
              to={generatePath(paymentUrl, { token })}
              className="checkout-review__back"
            >
              Go back to Previous Step
            </Link>

            <div className="checkout__step checkout__step--inactive">
              <span>5</span>
              <h4 className="checkout__header">Review your order</h4>
            </div>

            <div className="checkout__content">
              <CartTable
                lines={extractCheckoutLines(checkout.lines)}
                subtotal={checkout.subtotalPrice.gross.localized}
                deliveryCost={checkout.shippingMethod.price.localized}
                totalCost={checkout.totalPrice.gross.localized}
              />
              <div className="checkout-review__content">
                <Summary
                  checkout={checkout}
                  cardData={cardData}
                  dummyStatus={dummyStatus}
                />
                <div className="checkout-review__content__submit">
                  <OverlayContext.Consumer>
                    {({ show }) => (
                      <CartContext.Consumer>
                        {({ clear: clearCart }) => (
                          <UserContext.Consumer>
                            {({ user }) => (
                              <TypedCompleteCheckoutMutation
                                onCompleted={data =>
                                  completeCheckout(
                                    data,
                                    show,
                                    history,
                                    !user,
                                    clearCheckout,
                                    clearCart
                                  )
                                }
                              >
                                {(completeCheckout, { loading }) => (
                                  <Button
                                    type="submit"
                                    disabled={loading}
                                    onClick={() =>
                                      completeCheckout({
                                        variables: { checkoutId: checkout.id }
                                      })
                                    }
                                  >
                                    {loading ? "Loading" : "Place your order"}
                                  </Button>
                                )}
                              </TypedCompleteCheckoutMutation>
                            )}
                          </UserContext.Consumer>
                        )}
                      </CartContext.Consumer>
                    )}
                  </OverlayContext.Consumer>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }}
  </CheckoutContext.Consumer>
);

export default View;
