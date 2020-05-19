import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

import { FormattedMessage } from "react-intl";

/**
 * Cart footer to use with conjunction of cart rows
 */
const CartFooter: React.FC<IProps> = ({
  subtotalPrice,
  shippingPrice,
  discountPrice,
  totalPrice,
}: IProps) => {
  return (
    <S.Wrapper showShipping={!!shippingPrice} showDiscount={!!discountPrice}>
      <S.SubtotalText>
        <FormattedMessage
          defaultMessage="Subtotal"
        />
      </S.SubtotalText>
      <S.SubtotalPrice>{subtotalPrice}</S.SubtotalPrice>
      {shippingPrice && (
        <>
          <S.ShippingText>
            <FormattedMessage
             defaultMessage="Shipping"
            />
          </S.ShippingText>
          <S.ShippingPrice>{shippingPrice}</S.ShippingPrice>
        </>
      )}
      {discountPrice && (
        <>
          <S.DiscountText>
            <FormattedMessage
             defaultMessage="Promo Code"
            />
          </S.DiscountText>
          <S.DiscountPrice>{discountPrice}</S.DiscountPrice>
        </>
      )}
      <S.TotalText>
        <FormattedMessage
          defaultMessage="Total"
        />
      </S.TotalText>
      <S.TotalPrice>{totalPrice}</S.TotalPrice>
    </S.Wrapper>
  );
};

export { CartFooter };
