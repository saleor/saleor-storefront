import { History } from "history";
import * as React from "react";
import { generatePath } from "react-router";
import ReactSVG from "react-svg";

import { AddressSummary } from "../../../components";
import { CardData } from "../../types/CardData";
import { Checkout } from "../../types/Checkout";

import copyImg from "../../../images/copy.svg";
import {
  billingUrl,
  paymentUrl,
  shippingAddressUrl,
  shippingOptionsUrl,
} from "../../routes";

class Summary extends React.PureComponent<{
  checkout: Checkout;
  cardData: CardData;
  dummyStatus: string;
  history: History;
  token: string;
}> {
  render() {
    const { checkout, cardData, dummyStatus, history, token } = this.props;

    const handleEdit = (editUrl: string) => {
      history.push(
        generatePath(editUrl, {
          token,
        })
      );
    };

    return (
      <div className="checkout-review__content__summary">
        <div>
          <h4>
            Shipping address
            <ReactSVG
              className="checkout-review__summary-copy"
              path={copyImg}
              onClick={() => handleEdit(shippingAddressUrl)}
            />
          </h4>
          <AddressSummary
            address={checkout.isShippingRequired && checkout.shippingAddress}
            email={checkout.email}
          />
        </div>
        <div>
          <h4>
            Billing address
            <ReactSVG
              className="checkout-review__summary-copy"
              onClick={() => handleEdit(billingUrl)}
              path={copyImg}
            />
          </h4>
          <AddressSummary address={checkout.billingAddress} />
        </div>
        {checkout.isShippingRequired && (
          <div>
            <h4>
              Shipping method
              <ReactSVG
                className="checkout-review__summary-copy"
                onClick={() => handleEdit(shippingOptionsUrl)}
                path={copyImg}
              />
            </h4>
            <p>{checkout.shippingMethod.name}</p>
          </div>
        )}
        <div>
          <h4>
            Payment method
            <ReactSVG
              className="checkout-review__summary-copy"
              onClick={() => handleEdit(paymentUrl)}
              path={copyImg}
            />
          </h4>
          <p>
            {!!cardData
              ? `Ending in ${cardData.lastDigits}`
              : `Dummy: ${dummyStatus}`}
          </p>
        </div>
      </div>
    );
  }
}

export default Summary;
