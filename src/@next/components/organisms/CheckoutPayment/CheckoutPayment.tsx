import React, { useEffect, useState } from "react";

import { Checkbox } from "@components/atoms";
import { filterNotEmptyArrayItems } from "@utils/misc";

import { AddressForm } from "../AddressForm";
import { AddressGridSelector } from "../AddressGridSelector";
import { DiscountForm } from "../DiscountForm";
import { PaymentGatewaysList } from "../PaymentGatewaysList";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Payment options used in checkout.
 */
const CheckoutPayment: React.FC<IProps> = ({
  gatewayErrors,
  billingErrors,
  promoCodeErrors,
  selectedUserAddressId,
  userAddresses,
  billingAsShippingAddress = false,
  checkoutBillingAddress,
  countries,
  billingFormRef,
  billingFormId,
  paymentGateways,
  setBillingAddress,
  billingAsShippingPossible,
  setBillingAsShippingAddress,
  promoCodeDiscount,
  addPromoCode,
  removeVoucherCode,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  gatewayFormRef,
  gatewayFormId,
  userId,
  newAddressFormId,
  processPayment,
}: IProps) => {
  const [showPromoCodeForm, setShowPromoCodeForm] = useState(
    !!promoCodeDiscount?.voucherCode
  );

  useEffect(() => {
    const isVoucherCode = !!promoCodeDiscount?.voucherCode;
    if (isVoucherCode) {
      setShowPromoCodeForm(isVoucherCode);
    }
  }, [promoCodeDiscount?.voucherCode]);

  const handleChangeShowPromoCodeForm = () => {
    if (showPromoCodeForm && promoCodeDiscount?.voucherCode) {
      removeVoucherCode(promoCodeDiscount?.voucherCode);
    }
    setShowPromoCodeForm(!showPromoCodeForm);
  };

  const adresses =
    userAddresses?.filter(filterNotEmptyArrayItems).map(address => ({
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
        <S.Title data-cy="checkoutPageSubtitle">BILLING ADDRESS</S.Title>
        {billingAsShippingPossible && (
          <>
            <Checkbox
              data-cy="checkoutPaymentBillingAsShippingCheckbox"
              name="billing-same-as-shipping"
              checked={billingAsShippingAddress}
              onChange={() =>
                setBillingAsShippingAddress(!billingAsShippingAddress)
              }
            >
              Same as shipping address
            </Checkbox>
            <S.Divider />
          </>
        )}
        {!billingAsShippingAddress && (
          <>
            {userAddresses ? (
              <AddressGridSelector
                formId={billingFormId}
                formRef={billingFormRef}
                addresses={adresses}
                selectedAddressId={selectedUserAddressId}
                countriesOptions={countries?.filter(filterNotEmptyArrayItems)}
                userId={userId}
                errors={billingErrors}
                onSelect={(address, id) =>
                  setBillingAddress(address, undefined, id)
                }
                newAddressFormId={newAddressFormId}
              />
            ) : (
              <AddressForm
                formId={billingFormId}
                formRef={billingFormRef}
                countriesOptions={countries.filter(filterNotEmptyArrayItems)}
                address={checkoutBillingAddress || undefined}
                handleSubmit={address =>
                  address && setBillingAddress(address, address.email)
                }
                includeEmail={!billingAsShippingPossible}
                errors={billingErrors}
              />
            )}
          </>
        )}
      </S.Section>
      <S.Divider />
      <S.Section>
        <S.Title data-cy="checkoutPageSubtitle">PAYMENT METHOD</S.Title>
        <Checkbox
          data-cy="checkoutPaymentPromoCodeCheckbox"
          name="payment-promo-code"
          checked={showPromoCodeForm}
          onChange={handleChangeShowPromoCodeForm}
        >
          Do you have a gift card voucher or discount code?
        </Checkbox>
        {showPromoCodeForm && (
          <S.DiscountField>
            <DiscountForm
              discount={{ promoCode: promoCodeDiscount?.voucherCode }}
              handleApplyDiscount={addPromoCode}
              handleRemovePromoCode={() =>
                promoCodeDiscount?.voucherCode &&
                removeVoucherCode(promoCodeDiscount?.voucherCode)
              }
              errors={promoCodeErrors}
            />
          </S.DiscountField>
        )}
        <S.Divider />
        <PaymentGatewaysList
          errors={gatewayErrors}
          paymentGateways={paymentGateways}
          formRef={gatewayFormRef}
          formId={gatewayFormId}
          processPayment={processPayment}
          selectedPaymentGateway={selectedPaymentGateway}
          selectedPaymentGatewayToken={selectedPaymentGatewayToken}
          selectPaymentGateway={selectPaymentGateway}
        />
      </S.Section>
    </S.Wrapper>
  );
};

export { CheckoutPayment };
