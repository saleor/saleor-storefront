import React from "react";

import { AddressGridSelector } from "../AddressGridSelector";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Address form used in checkout.
 */
const CheckoutAddress: React.FC<IProps> = ({ user }: IProps) => {
  const adresses =
    user?.addresses
      ?.filter(function notEmpty<TValue>(
        value: TValue | null | undefined
      ): value is TValue {
        return value !== null && value !== undefined;
      })
      .map(address => ({
        address: {
          ...address,
          isDefaultBillingAddress: address.isDefaultBillingAddress || false,
          isDefaultShippingAddress: address.isDefaultShippingAddress || false,
          phone: address.phone || undefined,
        },
        id: address?.id || "",
        onSelect: () => null,
      })) || [];

  return (
    <S.Wrapper>
      <S.Title>SHIPPING ADDRESS</S.Title>
      {user ? (
        <AddressGridSelector addresses={adresses} onSelect={() => null} />
      ) : (
        <></>
      )}
    </S.Wrapper>
  );
};

export { CheckoutAddress };
