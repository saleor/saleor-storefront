import React from "react";

import { ErrorMessage } from "@components/atoms";
import { AddressSummary } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<IProps> = ({
  shippingAddress,
  billingAddress,
  shippingMethodName,
  paymentMethodName,
  email,
  errors,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Title data-cy="checkoutPageSubtitle">REVIEW ORDER</S.Title>
      <S.Grid>
        <S.Section>
          <S.SubTitle data-cy="checkoutReviewSectionTitle">
            Shipping Address
          </S.SubTitle>
          <S.Divider />
          <AddressSummary address={shippingAddress} email={email} />
        </S.Section>
        <S.Section>
          <S.SubTitle data-cy="checkoutReviewSectionTitle">
            Billing Address
          </S.SubTitle>
          <S.Divider />
          <AddressSummary address={billingAddress} email={email} />
        </S.Section>
        <S.Section>
          <S.SubTitle data-cy="checkoutReviewSectionTitle">
            Shipping Method
          </S.SubTitle>
          <S.Divider />
          <S.TextSummary>{shippingMethodName}</S.TextSummary>
        </S.Section>
        <S.Section>
          <S.SubTitle data-cy="checkoutReviewSectionTitle">
            Payment Method
          </S.SubTitle>
          <S.Divider />
          <S.TextSummary>{paymentMethodName}</S.TextSummary>
        </S.Section>
      </S.Grid>
      <ErrorMessage errors={errors} />
    </S.Wrapper>
  );
};

export { CheckoutReview };
