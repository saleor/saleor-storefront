import React, { useEffect, useState } from "react";

import { Checkbox } from "@components/atoms";
import { filterNotEmptyArrayItems } from "@utils/misc";

import { AddressForm } from "../AddressForm";
import { AddressGridSelector } from "../AddressGridSelector";
import { DiscountForm } from "../DiscountForm";
import { IDiscountFormData } from "../DiscountForm/types";
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
  promoCodeDiscountFormId,
  promoCodeDiscountFormRef,
  promoCodeDiscount,
  addPromoCode,
  removeVoucherCode,
  submitUnchangedDiscount,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  gatewayFormRef,
  gatewayFormId,
  userId,
  newAddressFormId,
  processPayment,
  onGatewayError,
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
    setShowPromoCodeForm(!showPromoCodeForm);
  };

  const handleSubmitPromoCode = (discountForm?: IDiscountFormData) => {
    const newPromoCode = discountForm?.promoCode;
    const savedPromoCode = promoCodeDiscount?.voucherCode;

    if ((!newPromoCode || !showPromoCodeForm) && savedPromoCode) {
      removeVoucherCode(savedPromoCode);
    } else if (newPromoCode && newPromoCode !== savedPromoCode) {
      addPromoCode(newPromoCode);
    } else {
      submitUnchangedDiscount();
    }
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
      <section>
        <S.Title data-cy="checkoutPageSubtitle">BILLING ADDRESS</S.Title>
        {billingAsShippingPossible && (
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
        )}
        {!billingAsShippingAddress && (
          <>
            {billingAsShippingPossible && <S.Divider />}
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
                  setBillingAddress(address, address?.email)
                }
                includeEmail={!billingAsShippingPossible}
                errors={billingErrors}
              />
            )}
          </>
        )}
      </section>
      <S.Divider />
      <section>
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
              formId={promoCodeDiscountFormId}
              formRef={promoCodeDiscountFormRef}
              handleSubmit={handleSubmitPromoCode}
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
          onError={onGatewayError}
        />
      </section>
    </S.Wrapper>
  );
};

export { CheckoutPayment };
