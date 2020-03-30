import React from "react";

import { AddressSummary } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<IProps> = ({
  shippingAddress,
  billingAddress,
  email,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Title>REVIEW ORDER</S.Title>
      <S.Grid>
        <S.Section>
          <S.SubTitle>Shipping Address</S.SubTitle>
          <S.Divider />
          <AddressSummary address={shippingAddress} email={email} />
        </S.Section>
        <S.Section>
          <S.SubTitle>Billing Address</S.SubTitle>
          <S.Divider />
          <AddressSummary address={billingAddress} email={email} />
        </S.Section>
        <S.Section>
          <S.SubTitle>Shipping Method</S.SubTitle>
          <S.Divider />
          ...
        </S.Section>
        <S.Section>
          <S.SubTitle>Payment Method</S.SubTitle>
          <S.Divider />
          ...
        </S.Section>
      </S.Grid>
    </S.Wrapper>
  );
};

export { CheckoutReview };
