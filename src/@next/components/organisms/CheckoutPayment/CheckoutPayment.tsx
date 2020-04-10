import React, { useState, useEffect } from "react";

import { Checkbox } from "@components/atoms";

import { AddressForm, AddressGridSelector, DiscountForm } from "..";
import { PaymentGatewaysList } from "../PaymentGatewaysList";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Payment options used in checkout.
 */
const CheckoutPayment: React.FC<IProps> = ({
  selectedUserAddressId,
  userAddresses,
  billingAsShippingAddress = false,
  checkoutBillingAddress,
  countries,
  formRef,
  formId,
  paymentGateways,
  setBillingAddress,
  setBillingAsShippingAddress,
  promoCodeDiscount,
  addPromoCode,
  removeVoucherCode,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  gatewayFormRef,
  processPayment,
}: IProps) => {
  const [showPromoCodeForm, setShowPromoCodeForm] = useState(
    !!promoCodeDiscount.voucherCode
  );

  useEffect(() => {
    const isVoucherCode = !!promoCodeDiscount.voucherCode;
    if (isVoucherCode) {
      setShowPromoCodeForm(!!promoCodeDiscount.voucherCode);
    }
  }, [promoCodeDiscount.voucherCode]);

  const handleChangeShowPromoCodeForm = () => {
    if (showPromoCodeForm && promoCodeDiscount?.voucherCode) {
      removeVoucherCode(promoCodeDiscount?.voucherCode);
    }
    setShowPromoCodeForm(!showPromoCodeForm);
  };

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
        <S.Title data-cy="checkoutPageSubtitle">BILLING ADDRESS</S.Title>
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
              <AddressForm
                formId={formId}
                formRef={formRef}
                countriesOptions={countries.filter(function notEmpty<TValue>(
                  value: TValue | null | undefined
                ): value is TValue {
                  return value !== null && value !== undefined;
                })}
                address={checkoutBillingAddress || undefined}
                handleSubmit={address => address && setBillingAddress(address)}
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
              errors={null}
            />
          </S.DiscountField>
        )}
        <S.Divider />
        <PaymentGatewaysList
          paymentGateways={paymentGateways}
          formRef={gatewayFormRef}
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
