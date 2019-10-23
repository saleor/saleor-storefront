import * as React from "react";
import { generatePath } from "react-router";

import { useUserDetails } from "@sdk/react";

import { FormAddressType } from "../../../components";
import { maybe } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  StepCheck,
  Steps,
  UserAddressSelector
} from "../../components";
import { CheckoutStep } from "../../context";
import { paymentUrl } from "../../routes";
import { CheckoutFormType } from "../../types";
import { Checkout } from "../../types/Checkout";
import { IBillingPageProps } from "./types";

import { CountryCode } from "types/globalTypes";

const computeMutationVariables = (
  formData: FormAddressType,
  checkout: Checkout,
  shippingAsBilling: boolean
) => {
  const { shippingAddress } = checkout;
  const data = shippingAsBilling
    ? (shippingAddress as FormAddressType)
    : formData;

  return {
    billingAddress: {
      city: data.city,
      country: maybe(() => data.country.value, data.country.code) as CountryCode,
      countryArea: data.countryArea,
      firstName: data.firstName,
      lastName: data.lastName,
      postalCode: data.postalCode,
      streetAddress1: data.streetAddress1,
      streetAddress2: data.streetAddress2,
    },
    checkoutId: checkout.id,
  };
};

const View: React.FC<IBillingPageProps> = ({
  checkout,
  validateStep,
  proceedToNextStepData,
  path,
  shippingAsBilling,
  shop,
  step,
  update,
  updateCheckoutBillingAddress,
}) => {
  const [saveBillingAddress, { loading, error }] = updateCheckoutBillingAddress;
  const errors = maybe(() => error.extraInfo.userInputErrors, []);

  const onSaveBillingAddressHandler = (formData: FormAddressType) => {
    return saveBillingAddress(
      computeMutationVariables(formData, checkout, shippingAsBilling)
    );
  };

  const onSubmitHandler = (formData: FormAddressType) => {
    return new Promise<boolean>(async resolve => {
      const result = await onSaveBillingAddressHandler(formData);
      resolve(!!result);
    });
  };

  const onProceedToShippingSubmit = async (formData: FormAddressType) => {
    const { history, token, update } = proceedToNextStepData;

    const result = await onSaveBillingAddressHandler(formData);
    const canProceed = !!result;

    if (canProceed) {
      update({
        checkout: result.data.checkout || checkout,
      });
      history.push(generatePath(paymentUrl, { token }));
    }
  };

  const billingProps = {
    buttonText: "Proceed to Payment",
    checkout,
    errors,
    loading,
    proceedToNextStep: onProceedToShippingSubmit,
    shippingAsBilling,
    type: "billing" as CheckoutFormType,
  };

  const { data: user } = useUserDetails();

  return validateStep ? (
    <StepCheck
      step={step}
      checkout={checkout}
      path={path}
      token={proceedToNextStepData.token}
    />
  ) : (
    <CartSummary checkout={checkout}>
      <Steps
        step={CheckoutStep.BillingAddress}
        token={proceedToNextStepData.token}
        checkout={checkout}
      >
        <>
          <div className="address-form__copy-address">
            <label className="checkbox">
              <input
                name="asBilling"
                type="checkbox"
                checked={shippingAsBilling}
                onChange={({ target: { checked } }) =>
                  update({
                    shippingAsBilling: checked,
                  })
                }
              />
              <span>Same as Shipping Address</span>
            </label>
          </div>
          {user ? (
            <UserAddressSelector
              update={update}
              user={user}
              onSubmit={onSubmitHandler}
              {...billingProps}
            />
          ) : (
            <GuestAddressForm
              key={`${shippingAsBilling}`}
              shop={shop}
              {...billingProps}
            />
          )}
        </>
      </Steps>
    </CartSummary>
  );
};

export default View;
