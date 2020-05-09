import "./scss/index.scss";
import styled from 'styled-components';

import { History } from "history";
import * as React from "react";
import { AlertManager, useAlert } from "react-alert";
import { generatePath, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { orderConfirmationUrl } from "../../../app/routes";
import { Button } from "../../../components";
import { CartContext } from "../../../components/CartProvider/context";
import { CheckoutContext } from "../../context";
import { paymentUrl } from "../../routes";
import { TypedCompleteCheckoutMutation } from "./queries";
import { completeCheckout } from "./types/completeCheckout";
import { CheckoutNextButton } from "@temp/components/Button";
import { Stepper } from "@temp/checkout/components/Stepper";

const completeCheckout = (
  data: completeCheckout,
  history: History,
  clearCheckout: () => void,
  clearCart: () => void,
  alert: AlertManager
) => {
  const canProceed = !data.checkoutComplete.errors.length;

  if (canProceed) {
    const { token } = data.checkoutComplete.order;
    history.push({
      pathname: orderConfirmationUrl,
      state: { token },
    });
    clearCheckout();
    clearCart();
  } else {
    data.checkoutComplete.errors.map(error => {
      alert.show(
        { title: error.message },
        {
          type: "error",
        }
      );
    });
  }
};

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    params: { token },
  },
}) => {
  const alert = useAlert();
  const {
    checkout,
    clear: clearCheckout,
  } = React.useContext(CheckoutContext);
  const { clear: clearCart } = React.useContext(CartContext);

  return (
    <>
      <div className="checkout-review">

        <div className="checkout__step checkout__step--inactive">
          <CheckoutTitle>Confirm Order</CheckoutTitle>
        </div>

        <Stepper activeStep={3} />

        <div className="checkout__content">
          <div className="checkout-review__content">
            <div className="checkout-review__content__submit">
              <TypedCompleteCheckoutMutation
                onCompleted={data =>
                  completeCheckout(
                    data,
                    history,
                    clearCheckout,
                    clearCart,
                    alert
                  )
                }
              >
                {(completeCheckout, { loading }) => (
                  <CheckoutNextButton
                    type="submit"
                    disabled={loading}
                    onClick={() =>
                      completeCheckout({
                        variables: {
                          checkoutId: checkout.id,
                        },
                      })
                    }
                  >
                    {loading ? "Loading" : "Place your order"}
                  </CheckoutNextButton>
                )}
              </TypedCompleteCheckoutMutation>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CheckoutTitle = styled.h1`
  color: #af9a50;
  font-size: 1.5rem;
  margin: 2rem 0;
`;

export default View;
