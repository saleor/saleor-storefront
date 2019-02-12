import * as React from "react";
import { mdiContentCopy } from "@mdi/js";

import { Icon } from "../../../components";

import { AddressSummary } from "../../components";
import { CardData } from "../../context";
import { Checkout } from "../../types/Checkout";

class Summary extends React.PureComponent<{
  checkout: Checkout;
  cardData: CardData;
}> {
  shippingAddressRef: React.RefObject<HTMLParagraphElement> = React.createRef();
  billingAddressRef: React.RefObject<HTMLParagraphElement> = React.createRef();
  shippingMethodRef: React.RefObject<HTMLParagraphElement> = React.createRef();
  paymentMethodRef: React.RefObject<HTMLParagraphElement> = React.createRef();

  copyHandler = (ref: React.RefObject<HTMLParagraphElement>) => () => {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(ref.current);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  };

  render() {
    const { checkout, cardData } = this.props;

    return (
      <div className="checkout-review__content__summary">
        <div>
          <h4>
            Shipping address
            <Icon
              className="checkout-review__summary-copy"
              path={mdiContentCopy}
              onClick={this.copyHandler(this.shippingAddressRef)}
            />
          </h4>
          <AddressSummary
            address={checkout.shippingAddress}
            email={checkout.email}
            paragraphRef={this.shippingAddressRef}
          />
        </div>
        <div>
          <h4>
            Billing address
            <Icon
              className="checkout-review__summary-copy"
              onClick={this.copyHandler(this.billingAddressRef)}
              path={mdiContentCopy}
            />
          </h4>
          <AddressSummary
            address={checkout.billingAddress}
            paragraphRef={this.billingAddressRef}
          />
        </div>
        <div>
          <h4>
            Shipping method
            <Icon
              className="checkout-review__summary-copy"
              onClick={this.copyHandler(this.shippingMethodRef)}
              path={mdiContentCopy}
            />
          </h4>
          <p ref={this.shippingMethodRef}>{checkout.shippingMethod.name}</p>
        </div>
        <div>
          <h4>
            Payment method
            <Icon
              className="checkout-review__summary-copy"
              onClick={this.copyHandler(this.paymentMethodRef)}
              path={mdiContentCopy}
            />
          </h4>
          <p ref={this.paymentMethodRef}>Ending in {cardData.lastDigits}</p>
        </div>
      </div>
    );
  }
}

export default Summary;
