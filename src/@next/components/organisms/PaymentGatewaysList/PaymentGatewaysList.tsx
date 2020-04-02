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
const PaymentGatewaysList: React.FC<IProps> = ({ paymentGateways }: IProps) => {
  return (
    <S.Wrapper>
      {paymentGateways.map(({ name, config }, index) => {
        switch (name) {
          case PROVIDERS.BRAINTREE.label:
            return (
              <>
                <S.Tile checked={false} key={index}>
                  <Radio
                    name="payment-method"
                    value="credit-card"
                    checked={false}
                    customLabel={true}
                  >
                    {name}
                  </Radio>
                </S.Tile>
                <BraintreePaymentGateway />
              </>
            );

          case PROVIDERS.DUMMY.label:
            return (
              <>
                <S.Tile checked={false} key={index}>
                  <Radio
                    name="payment-method"
                    value="dummy"
                    checked={false}
                    customLabel={true}
                  >
                    {name}
                  </Radio>
                </S.Tile>
                <DummyPaymentGateway />
              </>
            );

          case PROVIDERS.STRIPE.label:
            return (
              <>
                <S.Tile checked={false} key={index}>
                  <Radio
                    name="payment-method"
                    value="stripe"
                    checked={false}
                    customLabel={true}
                  >
                    {name}
                  </Radio>
                </S.Tile>
                <StripePaymentGateway />
              </>
            );
        }
      })}
    </S.Wrapper>
  );
};

export { PaymentGatewaysList };
