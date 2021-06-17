import React from "react";
import { FormattedMessage } from "react-intl";

import { ErrorMessage } from "@components/atoms";
import { AddressSummary } from "@components/molecules";
import { checkoutMessages } from "@temp/intl";
import Iframe from "react-iframe";

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
  // @ts-ignore
  iframe,
}: IProps) => {
  return (
    <S.Wrapper data-test="sectionTitle">
      {iframe ? (
        <>
          <S.Info3D>
            Questa finestra è gestita dalla tua banca, se dovessi avere qualche
            problema contattaci a !TOBEREPLACED!
          </S.Info3D>
          <S.IframeBox>
            <S.IframeContainer>
              <Iframe
                url={iframe}
                width="100%"
                height="600px"
                id="myId"
                className="myClassname"
                // @ts-ignore
                display="flex"
                position="relative"
              />
            </S.IframeContainer>
          </S.IframeBox>
        </>
      ) : (
        <>
          <S.Title data-test="checkoutPageSubtitle">
            <FormattedMessage {...checkoutMessages.reviewOrder} />
          </S.Title>
          <S.Grid>
            <section data-test="shippingAddressSection">
              <S.SubTitle>
                <FormattedMessage {...checkoutMessages.shippingAddress} />
              </S.SubTitle>
              <S.Divider />
              <AddressSummary address={shippingAddress} email={email} />
            </section>
            <section data-test="billingAddressSection">
              <S.SubTitle>
                <FormattedMessage defaultMessage="Billing Address" />
              </S.SubTitle>
              <S.Divider />
              <AddressSummary address={billingAddress} email={email} />
            </section>
            <section>
              <S.SubTitle>
                <FormattedMessage defaultMessage="Shipping Method" />
              </S.SubTitle>
              <S.Divider />
              <S.TextSummary data-test="shippingMethodName">
                {shippingMethodName}
              </S.TextSummary>
            </section>
            <section>
              <S.SubTitle>
                <FormattedMessage defaultMessage="Payment Method" />
              </S.SubTitle>
              <S.Divider />
              <S.TextSummary data-test="paymentMethodName">
                {paymentMethodName}
              </S.TextSummary>
            </section>
          </S.Grid>
          <S.NoteSection>
            {/* <S.Title>
          Stai acquistando una caramella? Se vuoi specificare altezza, peso o
          qualsiasi cosa possa esserci utile per selezionare meglio i vestiti ne
          saremmo felici!
        </S.Title>
        <Input placeholder="Mia figlia è alta 56cm!" onChange={getNote} /> */}
          </S.NoteSection>
        </>
      )}
      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Wrapper>
  );
};

export { CheckoutReview };
