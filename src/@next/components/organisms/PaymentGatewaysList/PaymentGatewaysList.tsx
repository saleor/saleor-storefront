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
  selectPaymentGateway,
  formRef,
  processPayment,
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
                    name="payment-method"
                    value="credit-card"
                    checked={checked}
                    onChange={() =>
                      selectPaymentGateway &&
                      selectPaymentGateway(PROVIDERS.BRAINTREE.label)
                    }
                    customLabel={true}
                  >
                    {name}
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
                    name="payment-method"
                    value="dummy"
                    checked={checked}
                    onChange={() =>
                      selectPaymentGateway &&
                      selectPaymentGateway(PROVIDERS.DUMMY.label)
                    }
                    customLabel={true}
                  >
                    {name}
                  </Radio>
                </S.Tile>
                {checked && (
                  <DummyPaymentGateway
                    formRef={formRef}
                    processPayment={processPayment}
                  />
                )}
              </div>
            );

          case PROVIDERS.STRIPE.label:
            return (
              <div key={index}>
                <S.Tile checked={checked}>
                  <Radio
                    name="payment-method"
                    value="stripe"
                    checked={checked}
                    onChange={() =>
                      selectPaymentGateway &&
                      selectPaymentGateway(PROVIDERS.STRIPE.label)
                    }
                    customLabel={true}
                  >
                    {name}
                  </Radio>
                </S.Tile>
                {checked && <StripePaymentGateway />}
              </div>
            );
        }
      })}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
