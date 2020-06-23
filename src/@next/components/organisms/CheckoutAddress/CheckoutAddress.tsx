import React from "react";
import { FormattedMessage } from "react-intl";

import { checkoutMessages } from "@temp/intl";
import { filterNotEmptyArrayItems } from "@utils/misc";

import { AddressForm } from "../AddressForm";
import { AddressGridSelector } from "../AddressGridSelector";

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
  userId,
  formRef,
  formId,
  setShippingAddress,
  errors,
  newAddressFormId,
}: IProps) => {
  return (
    <section>
      <S.Title data-test="checkoutPageSubtitle">
        <FormattedMessage {...checkoutMessages.shippingAddress} />
      </S.Title>
      {userAddresses ? (
        <AddressGridSelector
          formId={formId}
          formRef={formRef}
          addresses={userAddresses}
          selectedAddressId={selectedUserAddressId}
          countriesOptions={countries?.filter(filterNotEmptyArrayItems)}
          userId={userId}
          errors={errors}
          onSelect={(address, id) => setShippingAddress(address, undefined, id)}
          newAddressFormId={newAddressFormId}
        />
      ) : (
        <AddressForm
          testingContext="shippingAddressForm"
          formId={formId}
          formRef={formRef}
          countriesOptions={countries?.filter(filterNotEmptyArrayItems)}
          address={{
            ...checkoutAddress,
            email,
          }}
          handleSubmit={address => setShippingAddress(address, address?.email)}
          includeEmail
          errors={errors}
        />
      )}
    </section>
  );
};

export { CheckoutAddress };
