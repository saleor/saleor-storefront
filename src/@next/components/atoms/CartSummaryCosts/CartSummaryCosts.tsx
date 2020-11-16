import React from "react";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";

interface CartSummaryCostsProps {
  subtotalPrice: React.ReactNode;
  shippingPrice?: React.ReactNode;
  discountPrice?: React.ReactNode;
  totalPrice: React.ReactNode;
}

const CartSummaryCosts: React.FC<CartSummaryCostsProps> = ({
  subtotalPrice,
  shippingPrice,
  discountPrice,
  totalPrice,
}: CartSummaryCostsProps) => {
  return (
    <S.Wrapper showShipping={!!shippingPrice} showDiscount={!!discountPrice}>
      <S.SubtotalText>
        <FormattedMessage {...commonMessages.subtotal} />
      </S.SubtotalText>
      <S.SubtotalPrice>{subtotalPrice}</S.SubtotalPrice>
      {shippingPrice && (
        <>
          <S.ShippingText>
            <FormattedMessage {...commonMessages.shipping} />
          </S.ShippingText>
          <S.ShippingPrice>{shippingPrice}</S.ShippingPrice>
        </>
      )}
      {discountPrice && (
        <>
          <S.DiscountText>
            <FormattedMessage {...commonMessages.promoCode} />
          </S.DiscountText>
          <S.DiscountPrice>{discountPrice}</S.DiscountPrice>
        </>
      )}
      <S.TotalText>
        <FormattedMessage {...commonMessages.total} />
      </S.TotalText>
      <S.TotalPrice>{totalPrice}</S.TotalPrice>
    </S.Wrapper>
  );
};

export { CartSummaryCosts };
