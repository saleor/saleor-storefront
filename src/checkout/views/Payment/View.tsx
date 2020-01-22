import "./scss/index.scss";

import * as React from "react";
import { MutationFn } from "react-apollo";
import { generatePath, RouteComponentProps } from "react-router";

import { Checkout_availablePaymentGateways_config } from "../../../checkout/types/Checkout";
import { Button } from "../../../components";
import { PROVIDERS } from "../../../core/config";
import { CartSummary, Option, Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep,
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

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  match: {
    params: { token },
  },
}) => {
  const [loadingPayment, setLoadingPayment] = React.useState(false);
  const [selectedGeteway, setSelectedGeteway] = React.useState(null);

  const formRef = React.useRef<HTMLFormElement>(null);

  const setLoadingState = (loadingPayment: boolean) =>
    setLoadingPayment(loadingPayment);

  const proceedNext = (data: createPayment) => {
    const canProceed = !data.checkoutPaymentCreate.errors.length;

    if (canProceed) {
      const {
        history,
        match: {
          params: { token },
        },
      } = this.props;
      setLoadingPayment(false);
      history.push(generatePath(reviewUrl, { token }));
    }
  };

  const makeProcessPayment = (
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

  return (
    <CheckoutContext.Consumer>
      {checkout => (
        <CartSummary checkout={checkout.checkout}>
          <div className="checkout-payment">
            <Steps
              step={CheckoutStep.Payment}
              token={token}
              checkout={checkout.checkout}
            >
              <TypedPaymentMethodCreateMutation onCompleted={proceedNext}>
                {(createPaymentMethod, { loading: paymentCreateLoading }) => {
                  const { availablePaymentGateways } = checkout.checkout;
                  const processPayment = makeProcessPayment(
                    createPaymentMethod,
                    checkout
                  );
                  const loading = loadingPayment || paymentCreateLoading;
                  const optionProps = providerName => ({
                    key: providerName,
                    onSelect: () => setSelectedGeteway(providerName),
                    selected: selectedGeteway === providerName,
                    value: providerName,
                  });
                  const providerProps = {
                    checkout,
                    formRef,
                    loading,
                    processPayment,
                    setLoadingState,
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
                            formRef.current.dispatchEvent(new Event("submit"));
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
      )}
    </CheckoutContext.Consumer>
  );
};

export default View;
