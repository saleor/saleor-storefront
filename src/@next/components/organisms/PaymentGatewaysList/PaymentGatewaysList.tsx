import React from "react";

import { Radio } from "@components/atoms";
import { PROVIDERS } from "@temp/core/config";

import {
  BraintreePaymentGateway,
  DummyPaymentGateway,
  StripePaymentGateway,
} from "..";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Payment Gateways list
 */
const PaymentGatewaysList: React.FC<IProps> = ({
  paymentGateways,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  formRef,
  processPayment,
  errors,
}: IProps) => {
  return (
    <S.Wrapper>
      {paymentGateways.map(({ name, config }, index) => {
        const checked = selectedPaymentGateway === name;

        switch (name) {
          case PROVIDERS.BRAINTREE.label:
            return (
              <div key={index}>
                <S.Tile checked={checked}>
                  <Radio
                    data-cy="checkoutPaymentGatewayBraintreeInput"
                    name="payment-method"
                    value="credit-card"
                    checked={checked}
                    onChange={() =>
                      selectPaymentGateway &&
                      selectPaymentGateway(PROVIDERS.BRAINTREE.label)
                    }
                    customLabel={true}
                  >
                    <span data-cy="checkoutPaymentGatewayBraintreeName">
                      {name}
                    </span>
                  </Radio>
                </S.Tile>
                {checked && <BraintreePaymentGateway />}
              </div>
            );

          case PROVIDERS.DUMMY.label:
            return (
              <div key={index}>
                <S.Tile checked={checked}>
                  <Radio
                    data-cy="checkoutPaymentGatewayDummyInput"
                    name="payment-method"
                    value="dummy"
                    checked={checked}
                    onChange={() =>
                      selectPaymentGateway &&
                      selectPaymentGateway(PROVIDERS.DUMMY.label)
                    }
                    customLabel={true}
                  >
                    <span data-cy="checkoutPaymentGatewayDummyName">
                      {name}
                    </span>
                  </Radio>
                </S.Tile>
                {checked && (
                  <DummyPaymentGateway
                    config={config}
                    formRef={formRef}
                    processPayment={token =>
                      processPayment(PROVIDERS.DUMMY.label, token)
                    }
                    initialStatus={selectedPaymentGatewayToken}
                  />
                )}
              </div>
            );

          case PROVIDERS.STRIPE.label:
            return (
              <div key={index}>
                <S.Tile checked={checked}>
                  <Radio
                    data-cy="checkoutPaymentGatewayStripeInput"
                    name="payment-method"
                    value="stripe"
                    checked={checked}
                    onChange={() =>
                      selectPaymentGateway &&
                      selectPaymentGateway(PROVIDERS.STRIPE.label)
                    }
                    customLabel={true}
                  >
                    <span data-cy="checkoutPaymentGatewayStripeName">
                      {name}
                    </span>
                  </Radio>
                </S.Tile>
                {checked && (
                  <StripePaymentGateway
                    config={config}
                    href={PROVIDERS.STRIPE.href}
                    formRef={formRef}
                    processPayment={(token, cardData) =>
                      processPayment(PROVIDERS.STRIPE.label, token, cardData)
                    }
                    errors={errors}
                  />
                )}
              </div>
            );
        }
      })}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
