import "./scss/index.scss";

import { History } from "history";
import * as React from "react";

import { generatePath, Redirect, RouteComponentProps } from "react-router";

import {
  Button,
  OverlayContext,
  OverlayType,
  ShowOverlayType
} from "../../../components";
import { BASE_URL } from "../../../core/config";
import { AddressSummary, StepCheck } from "../../components";
import { CheckoutContext } from "../../context";
import { paymentUrl } from "../../routes";
import CartTable from "./CartTable";
import { TypedCompleteCheckoutMutation } from "./queries";
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
        <>
          <StepCheck
            checkout={checkout}
            step={step}
            path={path}
            token={token}
          />
          <div className="checkout-review">
            <div className="checkout__step checkout__step--inactive">
              <span>5</span>
              <h4 className="checkout__header">Review your order</h4>
            </div>

            <CartTable checkout={checkout} />

            <div className="checkout-review__content">
              <div className="checkout-review__content__summary">
                <div>
                  <h4>Shipping address</h4>
                  <AddressSummary
                    address={checkout.shippingAddress}
                    email={checkout.email}
                  />
                </div>
                <div>
                  <h4>Billing address</h4>
                  <AddressSummary address={checkout.billingAddress} />
                </div>
                <div>
                  <h4>Shipping method</h4>
                  {checkout.shippingMethod.name}
                </div>
                <div>
                  <h4>Payment method</h4>
                  Ending in {cardData.lastDigits}
                </div>
              </div>

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
        </>
      );
    }}
  </CheckoutContext.Consumer>
);

export default View;
