import React from "react";

import { AddressForm, AddressGridSelector } from "..";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Address form used in checkout.
 */
const CheckoutAddress: React.FC<IProps> = ({
  checkoutAddress,
  email,
  selectedUserAddressId,
  userAddresses,
  countries,
  formRef,
  formId,
  setShippingAddress,
  errors,
}: IProps) => {
  return (
    <S.Section>
      <S.Title data-cy="checkoutPageSubtitle">SHIPPING ADDRESS</S.Title>
      {userAddresses && userAddresses.length ? (
        <AddressGridSelector
          formId={formId}
          formRef={formRef}
          addresses={userAddresses}
          selectedAddressId={selectedUserAddressId}
          errors={errors}
          onSelect={(address, id) => setShippingAddress(address, undefined, id)}
        />
      ) : (
        <AddressForm
          formId={formId}
          formRef={formRef}
          countriesOptions={countries?.filter(function notEmpty<TValue>(
            value: TValue | null | undefined
          ): value is TValue {
            return value !== null && value !== undefined;
          })}
          address={{
            ...checkoutAddress,
            email,
          }}
          handleSubmit={address =>
            address && setShippingAddress(address, address.email)
          }
          errors={errors}
        />
      )}
    </S.Section>
  );
};

export { CheckoutAddress };
