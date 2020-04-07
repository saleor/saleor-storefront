import React from "react";

import { Radio } from "@components/atoms";
import { Money } from "@components/containers";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShipping: React.FC<IProps> = ({
  shippingMethods,
  selectedShippingMethodId,
  selectShippingMethod,
}: IProps) => {
  return (
    <S.Section>
      <S.Title data-cy="checkoutPageSubtitle">SHIPPING METHOD</S.Title>
      <S.ShippingMethodList>
        {shippingMethods.map(({ id, name, price }) => {
          const checked =
            !!selectedShippingMethodId && selectedShippingMethodId === id;

          return (
            <S.Tile checked={checked} key={id}>
              <Radio
                data-cy={`checkoutShippingMethodOption${id}Input`}
                name="shipping-method"
                value={id}
                checked={checked}
                customLabel={true}
                onChange={() =>
                  selectShippingMethod && !checked && selectShippingMethod(id)
                }
              >
                <span data-cy={`checkoutShippingMethodOption${id}Name`}>
                  {name}
                </span>
                <S.Price>
                  {" "}
                  | +
                  {
                    <Money
                      data-cy={`checkoutShippingMethodOption${id}Price`}
                      money={price || undefined}
                    />
                  }
                </S.Price>
              </Radio>
            </S.Tile>
          );
        })}
      </S.ShippingMethodList>
    </S.Section>
  );
};

export { CheckoutShipping };
