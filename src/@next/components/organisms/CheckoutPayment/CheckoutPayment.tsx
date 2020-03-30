import React from "react";

import { Checkbox } from "@components/atoms";

import { AddressGridSelector, DiscountForm } from "..";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Payment options used in checkout.
 */
const CheckoutPayment: React.FC<IProps> = ({
  selectedUserAddressId,
  userAddresses,
  billingAsShippingAddress = false,
  setBillingAddress,
  setBillingAsShippingAddress,
}: IProps) => {
  const adresses =
    userAddresses
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
      <S.Section>
        <S.Title>BILLING ADDRESS</S.Title>
        <Checkbox
          name="billing-same-as-shipping"
          checked={billingAsShippingAddress}
          onChange={() =>
            setBillingAsShippingAddress(!billingAsShippingAddress)
          }
        >
          Same as shipping address
        </Checkbox>
        {!billingAsShippingAddress && (
          <>
            <S.Divider />
            {userAddresses ? (
              <AddressGridSelector
                addresses={adresses}
                selectedAddressId={selectedUserAddressId}
                onSelect={setBillingAddress}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </S.Section>
      <S.Divider />
      <S.Section>
        <S.Title>PAYMENT METHOD</S.Title>
        <Checkbox
          name="billing-same-as-shipping"
          checked={billingAsShippingAddress}
          onChange={() =>
            setBillingAsShippingAddress(!billingAsShippingAddress)
          }
        >
          Do you have a gift card voucher or discount code?
        </Checkbox>
        <S.DiscountField>
          <DiscountForm
            discount={{ promoCode: null }}
            handleApplyDiscount={() => null}
            handleRemovePromoCode={() => null}
            errors={null}
          />
        </S.DiscountField>
        <S.Divider />
      </S.Section>
    </S.Wrapper>
  );
};

export { CheckoutPayment };
