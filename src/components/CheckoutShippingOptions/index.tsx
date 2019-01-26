import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { Button } from "..";
import {
  CheckoutContext,
  CheckoutContextInterface
} from "../CheckoutApp/context";
import { checkoutBaseUrl, checkoutBillingUrl } from "../CheckoutApp/routes";
import { TypedUpdateCheckoutShippingOptionsMutation } from "./queries";
import ShippingOptionsList from "./ShippingOptionsList";
import { updateCheckoutShippingOptions } from "./types/updateCheckoutShippingOptions";
import { AddressSummary } from "../../checkout/components";

class CheckoutShippingOptions extends React.Component<
  RouteComponentProps<{ id }>,
  { selectedShipping: string }
> {
  constructor(props) {
    super(props);
    this.state = { selectedShipping: "" };
  }

  proceedToBilling(
    data: updateCheckoutShippingOptions,
    checkoutCtx: CheckoutContextInterface
  ) {
    const canProceed = !data.checkoutShippingMethodUpdate.errors.length;

    if (canProceed) {
      checkoutCtx.updateCheckout({
        checkout: data.checkoutShippingMethodUpdate.checkout
      });
      this.props.history.push(checkoutBillingUrl(checkoutCtx.checkout.token));
    }
  }

  handleShippngChange = (shippingId: string) => {
    this.setState({ selectedShipping: shippingId });
  };

  render() {
    const { selectedShipping } = this.state;

    return (
      <div className="checkout-shipping-options">
        <CheckoutContext.Consumer>
          {checkoutCtx => {
            const { checkout } = checkoutCtx;
            return (
              <>
                <Link to={checkoutBaseUrl(checkout.token)}>
                  <div className="checkout__step checkout__step--inactive">
                    <span>1</span>
                    <h4 className="checkout__header">Shipping Address</h4>
                  </div>
                </Link>
                <div className="checkout__content">
                  <AddressSummary
                    address={checkout.shippingAddress}
                    email={checkout.email}
                  />
                </div>
                <div className="checkout__step">
                  <span>2</span>
                  <h4 className="checkout__header">Shipping Method</h4>
                </div>
                <TypedUpdateCheckoutShippingOptionsMutation
                  onCompleted={data => this.proceedToBilling(data, checkoutCtx)}
                >
                  {(updateCheckoutShippingOptions, { loading }) => {
                    return (
                      <div className="checkout__content">
                        <ShippingOptionsList
                          checkout={checkout}
                          selected={selectedShipping}
                          onShippingSelect={this.handleShippngChange}
                        />
                        <Button
                          onClick={event => {
                            updateCheckoutShippingOptions({
                              variables: {
                                checkoutId: checkout.id,
                                shippingMethodId: selectedShipping
                              }
                            });
                            event.preventDefault();
                          }}
                          disabled={
                            loading ||
                            !checkout.availableShippingMethods.length ||
                            !selectedShipping
                          }
                        >
                          {loading ? "Loading" : "Continue to billing"}
                        </Button>
                      </div>
                    );
                  }}
                </TypedUpdateCheckoutShippingOptionsMutation>
                <div className="checkout__step">
                  <span>3</span>
                  <h4 className="checkout__header">Billing</h4>
                </div>
                <div className="checkout__step">
                  <span>4</span>
                  <h4 className="checkout__header">Payment Method</h4>
                </div>
              </>
            );
          }}
        </CheckoutContext.Consumer>
      </div>
    );
  }
}

export default CheckoutShippingOptions;
