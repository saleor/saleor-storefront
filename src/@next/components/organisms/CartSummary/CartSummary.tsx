import React from "react";

import { TaxedMoney } from "@components/containers";
import { CartSummaryRow } from "@components/molecules";

import * as S from "./styles";
import { ICostLine, ICosts, IProps } from "./types";

const CostLine = ({
  name,
  cost,
  last = false,
  negative = false,
}: ICostLine) => (
  <S.CostLine last={last}>
    <span>{name}</span>
    <span>
      {negative && "- "}
      <TaxedMoney taxedMoney={cost} />
    </span>
  </S.CostLine>
);

const Costs = ({ subtotal, promoCode, shipping, total }: ICosts) => (
  <S.Costs>
    {subtotal && <CostLine name="Subtotal" cost={subtotal} />}
    {promoCode && (
      <CostLine name="Promo Code" cost={promoCode} negative={true} />
    )}
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
  products,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Title>Cart Summary</S.Title>
      <S.HR />
      <S.CartSummaryProductList>
        {products?.map(product => (
          <>
            <S.ProductLine>
              <CartSummaryRow
                sku={product.sku}
                quantity={product.quantity}
                name={product.name}
                price={product.price}
                thumbnail={product.thumbnail}
              />
            </S.ProductLine>
            <S.HR />
          </>
        ))}
      </S.CartSummaryProductList>
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
