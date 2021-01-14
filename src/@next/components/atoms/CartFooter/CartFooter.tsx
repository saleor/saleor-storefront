import React from "react";
import { FormattedMessage } from "react-intl";

import { TaxedMoney } from "@components/containers";
import { commonMessages } from "@temp/intl";
import { ITaxedMoney } from "@types";

import * as S from "./styles";

export interface CartFooterProps {
  subtotalPrice?: ITaxedMoney | null;
  shippingPrice?: ITaxedMoney | null;
  discountPrice?: ITaxedMoney | null;
  totalPrice?: ITaxedMoney | null;
}

/**
 * Cart footer to use with conjunction of cart rows
 */
const CartFooter: React.FC<CartFooterProps> = ({
  subtotalPrice,
  shippingPrice,
  discountPrice,
  totalPrice,
}: CartFooterProps) => {
  const isShipping = !!shippingPrice?.gross && shippingPrice.gross.amount !== 0;
  const isDiscount = !!discountPrice?.gross && discountPrice.gross.amount !== 0;

  return (
    <S.Wrapper showShipping={isShipping} showDiscount={isDiscount}>
      <S.SubtotalText>
        <FormattedMessage {...commonMessages.subtotal} />
      </S.SubtotalText>
      <S.SubtotalPrice>
        <TaxedMoney data-test="subtotalPrice" taxedMoney={subtotalPrice} />
      </S.SubtotalPrice>
      {isShipping && (
        <>
          <S.ShippingText>
            <FormattedMessage {...commonMessages.shipping} />
          </S.ShippingText>
          <S.ShippingPrice>
            <TaxedMoney data-test="shippingPrice" taxedMoney={shippingPrice} />
          </S.ShippingPrice>
        </>
      )}
      {isDiscount && (
        <>
          <S.DiscountText>
            <FormattedMessage {...commonMessages.promoCode} />
          </S.DiscountText>
          <S.DiscountPrice>
            <TaxedMoney data-test="discountPrice" taxedMoney={discountPrice} />
          </S.DiscountPrice>
        </>
      )}
      <S.TotalText>
        <FormattedMessage {...commonMessages.total} />
      </S.TotalText>
      <S.TotalPrice>
        <TaxedMoney data-test="totalPrice" taxedMoney={totalPrice} />
      </S.TotalPrice>
    </S.Wrapper>
  );
};

export { CartFooter };
