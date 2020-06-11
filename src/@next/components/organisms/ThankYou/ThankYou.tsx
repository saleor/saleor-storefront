import React from "react";

import { Button } from "@components/atoms";
import { Container } from "@components/templates";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Thank you page after completing the checkout.
 */
const ThankYou: React.FC<IProps> = ({
  orderNumber,
  continueShopping,
  orderDetails,
}: IProps) => {
  return (
    <Container>
      <S.Wrapper>
        <S.ThankYouHeader>
          Dziękujemy
          <br />
          <span>za Twoje zamówienie!</span>
        </S.ThankYouHeader>
        <S.Paragraph>
          Twój numer zamówienia to: <span>{orderNumber}</span>
        </S.Paragraph>
        <S.Paragraph>
          Wysłaliśmy potwierdzenia zamówienia na Twoją skrzynkę mailową. Powiadomimy Cię kiedy 
          zamówienie zostanie  wysłane.
        </S.Paragraph>
        <S.Buttons>
          <Button dataCy="continueShoppingButton" onClick={continueShopping} color="secondary" fullWidth={true}>
            KONTYNUUJ ZAKUPY
          </Button>
          <Button dataCy="gotoOrderDetailsButton" onClick={orderDetails} fullWidth={true}>
            SZCZEGÓŁY ZAMÓWIENIA
          </Button>
        </S.Buttons>
      </S.Wrapper>
    </Container>
  );
};

export { ThankYou };
