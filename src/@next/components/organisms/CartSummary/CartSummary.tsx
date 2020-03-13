import React from "react";

import * as S from "./styles";
import { IProps, ICosts, ICostLine } from "./types";
import { TaxedMoney } from "../../containers";

const CostLine: React.FC<ICostLine> = ({
  name,
  cost,
  last = false,
}: ICostLine) => (
  <S.CostLine last={last}>
    <span>{name}</span>
    <span>
      <TaxedMoney taxedMoney={cost} />
    </span>
  </S.CostLine>
);

const Costs: React.FC<ICosts> = ({
  subtotal,
  promoCode,
  shipping,
  total,
}: ICosts) => (
  <S.Costs>
    {subtotal && <CostLine name="Subtotal" cost={subtotal} />}
    {promoCode && <CostLine name="Promo Code" cost={promoCode} />}
    {shipping && <CostLine name="Shipping" cost={shipping} />}
    {total && <CostLine name="Total" cost={total} last={true} />}
  </S.Costs>
);

/**
 * Cart summary displayed in checkout page
 */
const CartSummary: React.FC<IProps> = ({
  subtotal,
  total,
  shipping,
  promoCode,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Title>Cart Summary</S.Title>
      <Costs
        subtotal={subtotal}
        total={total}
        shipping={shipping}
        promoCode={promoCode}
      />
    </S.Wrapper>
  );
};

export { CartSummary };
