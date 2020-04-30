import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

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
      <S.SubtotalText>Subtotal</S.SubtotalText>
      <S.SubtotalPrice>{subtotalPrice}</S.SubtotalPrice>
      {shippingPrice && (
        <>
          <S.ShippingText>Shipping</S.ShippingText>
          <S.ShippingPrice>{shippingPrice}</S.ShippingPrice>
        </>
      )}
      {discountPrice && (
        <>
          <S.DiscountText>Promo Code</S.DiscountText>
          <S.DiscountPrice>{discountPrice}</S.DiscountPrice>
        </>
      )}
      <S.TotalText>Total</S.TotalText>
      <S.TotalPrice>{totalPrice}</S.TotalPrice>
    </S.Wrapper>
  );
};

export { CartFooter };
