import React from "react";

import { TaxedMoney } from "@components/containers";
import { CartSummaryRow } from "@components/molecules";

import * as S from "./styles";
import { ICostLine, ICosts, IProps } from "./types";

const ProductList: React.FC = ({ products }) =>
  products.map(product => (
    <>
      <S.ProductLine>
        <CartSummaryRow
          sku={product.sku}
          quantity={product.quanity}
          name={product.name}
          price={product.price}
          thumbnail={product.thumbnail}
        />
      </S.ProductLine>
      <S.HR />
    </>
  ));

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
  products,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Title>Cart Summary</S.Title>
      <S.HR />
      <ProductList products={products} />
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
