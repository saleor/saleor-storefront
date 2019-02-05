import "./scss/index.scss";

import { History } from "history";
import * as React from "react";
import { generatePath, Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import {
  Button,
  CartTable,
  OverlayContext,
  OverlayType,
  ShowOverlayType
} from "../../../components";
import { extractCheckoutLines } from "../../../components/CartProvider/uitls";
import { BASE_URL } from "../../../core/config";
import { AddressSummary, StepCheck } from "../../components";
import { CheckoutContext } from "../../context";
import { paymentUrl } from "../../routes";
import { TypedCompleteCheckoutMutation } from "./queries";
import Summary from "./Summary";
import { completeCheckout } from "./types/completeCheckout";

const completeCheckout = (
  data: completeCheckout,
  show: ShowOverlayType,
  history: History,
  clear: () => void
) => {
  const canProceed = !data.checkoutComplete.errors.length;

  if (canProceed) {
    history.push(BASE_URL);
    clear();
    localStorage.removeItem("cart");
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
    {({ cardData, checkout, clear, step }) => {
      if (!cardData) {
        return <Redirect to={generatePath(paymentUrl, { token })} />;
      }
      return (
        <StepCheck checkout={checkout} step={step} path={path} token={token}>
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
                <Summary checkout={checkout} cardData={cardData} />
                <div className="checkout-review__content__submit">
                  <OverlayContext.Consumer>
                    {({ show }) => (
                      <TypedCompleteCheckoutMutation
                        onCompleted={data =>
                          completeCheckout(data, show, history, clear)
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
                  </OverlayContext.Consumer>
                </div>
              </div>
            </div>
          </div>
        </StepCheck>
      );
    }}
  </CheckoutContext.Consumer>
);

export default View;
