import "./scss/index.scss";

import * as React from "react";
import { generatePath, RouteComponentProps } from "react-router";

import { Button } from "../../../components";
import { StepCheck, Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { billingUrl } from "../../routes";
import { TypedUpdateCheckoutShippingOptionsMutation } from "./queries";
import ShippingOptionsList from "./ShippingOptionsList";
import { updateCheckoutShippingOptions } from "./types/updateCheckoutShippingOptions";

class View extends React.Component<
  RouteComponentProps<{ token?: string }>,
  { selectedShipping: string }
> {
  state = { selectedShipping: "" };

  proceedToBilling(
    data: updateCheckoutShippingOptions,
    update: (checkoutData: CheckoutContextInterface) => void,
    token?: string
  ) {
    const canProceed = !data.checkoutShippingMethodUpdate.errors.length;

    if (canProceed) {
      update({ checkout: data.checkoutShippingMethodUpdate.checkout });
      this.props.history.push(generatePath(billingUrl, { token }));
    }
  }

  handleShippngChange = (shippingId: string) => {
    this.setState({ selectedShipping: shippingId });
  };

  render() {
    const { selectedShipping } = this.state;
    const {
      params: { token },
      path
    } = this.props.match;

    return (
      <div className="checkout-shipping-options">
        <CheckoutContext.Consumer>
          {({ checkout, update, step }) => (
            <StepCheck
              checkout={checkout}
              step={step}
              path={path}
              token={token}
            >
              <Steps
                step={CheckoutStep.ShippingOption}
                token={token}
                checkout={checkout}
              >
                <TypedUpdateCheckoutShippingOptionsMutation
                  onCompleted={data =>
                    this.proceedToBilling(data, update, token)
                  }
                >
                  {(updateCheckoutShippingOptions, { loading }) => {
                    return (
                      <>
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
                      </>
                    );
                  }}
                </TypedUpdateCheckoutShippingOptionsMutation>
              </Steps>
            </StepCheck>
          )}
        </CheckoutContext.Consumer>
      </div>
    );
  }
}

export default View;
