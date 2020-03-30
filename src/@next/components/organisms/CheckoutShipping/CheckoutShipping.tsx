import React from "react";

import { Radio, Tile } from "@components/atoms";
import { Money } from "@components/containers";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShipping: React.FC<IProps> = ({
  shippingMethods,
  selectedShippingMethodId,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Title>SHIPPING METHOD</S.Title>
      <S.ShippingMethodList>
        {shippingMethods.map(({ id, name, price }) => {
          const checked =
            !!selectedShippingMethodId && selectedShippingMethodId === id;

          return (
            <S.Tile checked={checked}>
              <Radio
                name="shipping-method"
                value={id}
                checked={checked}
                customLabel={true}
              >
                {name}
                <S.Price> | +{<Money money={price || undefined} />}</S.Price>
              </Radio>
            </S.Tile>
          );
        })}
      </S.ShippingMethodList>
    </S.Wrapper>
  );
};

export { CheckoutShipping };
