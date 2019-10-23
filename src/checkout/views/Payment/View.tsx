import "./scss/index.scss";

import * as React from "react";
import { MutationFn } from "react-apollo";
import { generatePath, RouteComponentProps } from "react-router";

import { Checkout_availablePaymentGateways_config } from "../../../checkout/types/Checkout";
import { Button } from "../../../components";
import { PROVIDERS } from "../../../core/config";
import { CartSummary, Option, StepCheck, Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { reviewUrl } from "../../routes";
import CreditCard from "./Gateways/Braintree/CreditCard";
import Dummy from "./Gateways/Dummy";
import { Stripe } from "./Gateways/Stripe";
import { TypedPaymentMethodCreateMutation } from "./queries";
import { createPayment, createPaymentVariables } from "./types/createPayment";

import { CountryCode } from "types/globalTypes";

export interface ProviderProps {
  loading: boolean;
  formRef: React.RefObject<HTMLFormElement>;
  checkout: CheckoutContextInterface;
  paymentGatewayConfig: Checkout_availablePaymentGateways_config[];
  processPayment(token: string, gateway: string): Promise<void>;
  setLoadingState(loading: boolean): void;
}

class View extends React.Component<
  RouteComponentProps<{ token?: string }>,
  {
    loading: boolean;
    validateStep: boolean;
    selectedGeteway: string;
  }
> {
  state = {
    loading: false,
    selectedGeteway: null,
    validateStep: true,
  };
  formRef: React.RefObject<HTMLFormElement> = React.createRef();

  setLoadingState = (loading: boolean) => this.setState({ loading });

  proceedNext = (data: createPayment) => {
    const canProceed = !data.checkoutPaymentCreate.errors.length;

    if (canProceed) {
      const {
        history,
        match: {
          params: { token },
        },
      } = this.props;
      this.setState({ loading: false });
      history.push(generatePath(reviewUrl, { token }));
    }
  };

  componentDidMount() {
    this.setState({ validateStep: false });
  }

  processPayment = (
    createPaymentMethod: MutationFn<createPayment, createPaymentVariables>,
    checkout: CheckoutContextInterface
  ) => async (token: string, gateway: string) => {
    const {
      checkout: { billingAddress, totalPrice, id },
    } = checkout;

    if (token) {
      createPaymentMethod({
        variables: {
          checkoutId: id,
          input: {
            amount: totalPrice.gross.amount,
            billingAddress: {
              city: billingAddress.city,
              country: billingAddress.country.code as CountryCode,
              countryArea: billingAddress.countryArea,
              firstName: billingAddress.firstName,
              lastName: billingAddress.lastName,
              postalCode: billingAddress.postalCode,
              streetAddress1: billingAddress.streetAddress1,
              streetAddress2: billingAddress.streetAddress2,
            },
            gateway,
            token,
          },
        },
      });
    }
  };

  render() {
    const {
      params: { token },
      path,
    } = this.props.match;
    const { selectedGeteway, loading: stateLoding } = this.state;

    return (
      <CheckoutContext.Consumer>
        {checkout =>
          this.state.validateStep ? (
            <StepCheck
              checkout={checkout.checkout}
              step={checkout.step}
              path={path}
              token={token}
            />
          ) : (
            <CartSummary checkout={checkout.checkout}>
              <div className="checkout-payment">
                <Steps
                  step={CheckoutStep.Payment}
                  token={token}
                  checkout={checkout.checkout}
                >
                  <TypedPaymentMethodCreateMutation
                    onCompleted={this.proceedNext}
                  >
                    {(
                      createPaymentMethod,
                      { loading: paymentCreateLoading }
                    ) => {
                      const { availablePaymentGateways } = checkout.checkout;
                      const processPayment = this.processPayment(
                        createPaymentMethod,
                        checkout
                      );
                      const loading = stateLoding || paymentCreateLoading;
                      const optionProps = providerName => ({
                        key: providerName,
                        onSelect: () =>
                          this.setState({ selectedGeteway: providerName }),
                        selected: selectedGeteway === providerName,
                        value: providerName,
                      });
                      const providerProps = {
                        checkout,
                        formRef: this.formRef,
                        loading,
                        processPayment,
                        setLoadingState: this.setLoadingState,
                      };

                      return (
                        <div className="checkout-payment__form">
                          {availablePaymentGateways.map(provider => {
                            const providerName = provider.name;
                            const paymentGatewayProps = {
                              ...providerProps,
                              paymentGatewayConfig: provider.config,
                            };
                            switch (providerName) {
                              case PROVIDERS.BRAINTREE:
                                return (
                                  <Option
                                    label="Credit Card"
                                    {...optionProps(providerName)}
                                  >
                                    <CreditCard {...paymentGatewayProps} />
                                  </Option>
                                );

                              case PROVIDERS.DUMMY:
                                return (
                                  <Option
                                    label="Dummy"
                                    {...optionProps(providerName)}
                                  >
                                    <Dummy {...paymentGatewayProps} />
                                  </Option>
                                );

                              case PROVIDERS.STRIPE:
                                return (
                                  <Option
                                    label="Stripe"
                                    {...optionProps(providerName)}
                                  >
                                    <Stripe {...paymentGatewayProps} />
                                  </Option>
                                );
                            }
                          })}

                          <div>
                            <Button
                              type="submit"
                              disabled={loading}
                              onClick={() => {
                                this.formRef.current.dispatchEvent(
                                  new Event("submit")
                                );
                              }}
                            >
                              Continue to Review Your Order
                            </Button>
                          </div>
                        </div>
                      );
                    }}
                  </TypedPaymentMethodCreateMutation>
                </Steps>
              </div>
            </CartSummary>
          )
        }
      </CheckoutContext.Consumer>
    );
  }
}

export default View;
