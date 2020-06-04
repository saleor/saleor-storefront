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
    <S.Wrapper data-test="checkoutReviewSectionTitle">
      <S.Title data-test="checkoutPageSubtitle">REVIEW ORDER</S.Title>
      <S.Grid>
        <section>
          <S.SubTitle data-test="checkoutReviewSectionTitle">
            Shipping Address
          </S.SubTitle>
          <S.Divider />
          <AddressSummary testingContext="shippingAddress" address={shippingAddress} email={email} />
        </section>
        <section>
          <S.SubTitle data-test="checkoutReviewSectionTitle">
            Billing Address
          </S.SubTitle>
          <S.Divider />
          <AddressSummary testingContext="billingAddress" address={billingAddress} email={email} />
        </section>
        <section>
          <S.SubTitle>
            Shipping Method
          </S.SubTitle>
          <S.Divider />
          <S.TextSummary data-test="shippingMethodName">{shippingMethodName}</S.TextSummary>
        </section>
        <section>
          <S.SubTitle>
            Payment Method
          </S.SubTitle>
          <S.Divider />
          <S.TextSummary data-test="paymentMethodName">{paymentMethodName}</S.TextSummary>
        </section>
      </S.Grid>
      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Wrapper>
  );
};

export { CheckoutReview };
