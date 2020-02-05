import "./scss/index.scss";

import { History } from "history";
import * as React from "react";
import { AlertManager, useAlert } from "react-alert";
import { generatePath, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { Money, TaxedMoney } from "@components/containers";

import { Button, CartTable } from "../../../components";
import { CartContext } from "../../../components/CartProvider/context";
import { extractCheckoutLines } from "../../../components/CartProvider/utils";
import { orderConfirmationUrl } from "../../../routes";
import { CheckoutContext } from "../../context";
import { paymentUrl } from "../../routes";
import { TypedCompleteCheckoutMutation } from "./queries";
import Summary from "./Summary";
import { completeCheckout } from "./types/completeCheckout";

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
    cardData,
    dummyStatus,
    checkout,
    clear: clearCheckout,
  } = React.useContext(CheckoutContext);
  const { clear: clearCart } = React.useContext(CartContext);

  const discountExists = checkout.discount && !!checkout.discount.amount;

  return (
    <>
      <div className="checkout-review">
        <Link
          to={generatePath(paymentUrl, { token })}
          className="checkout-review__back"
        >
          Go back to the previous Step
        </Link>

        <div className="checkout__step checkout__step--inactive">
          <span>{checkout.isShippingRequired ? "5" : "3"}</span>
          <h4 className="checkout__header">Review your order</h4>
        </div>

        <div className="checkout__content">
          <CartTable
            lines={extractCheckoutLines(checkout.lines)}
            subtotal={<TaxedMoney taxedMoney={checkout.subtotalPrice} />}
            deliveryCost={
              <Money defaultValue="0" money={checkout.shippingMethod.price} />
            }
            totalCost={<Money money={checkout.totalPrice.gross} />}
            discount={
              discountExists && (
                <>
                  - <Money money={checkout.discount} />
                </>
              )
            }
            discountName={checkout.discountName}
          />
          <div className="checkout-review__content">
            <Summary
              checkout={checkout}
              cardData={cardData}
              dummyStatus={dummyStatus}
              history={history}
              token={token}
            />
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
                  <Button
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
                  </Button>
                )}
              </TypedCompleteCheckoutMutation>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
