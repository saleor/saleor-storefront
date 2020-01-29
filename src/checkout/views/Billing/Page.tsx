import * as React from "react";
import { generatePath } from "react-router";

import { useUserDetails } from "@sdk/react";

import { FormAddressType } from "../../../components";
import { maybe } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  Steps,
  UserAddressSelector,
} from "../../components";
import { CheckoutStep } from "../../context";
import { paymentUrl } from "../../routes";
import { CheckoutFormType } from "../../types";
import { Checkout } from "../../types/Checkout";
import { IBillingPageProps } from "./types";

import { CountryCode } from "types/globalTypes";
import { CartLineInterface } from "../../../components/CartProvider/context";

const computeMutationVariables = (
  formData: FormAddressType,
  checkout: Checkout,
  shippingAsBilling: boolean
) => {
  const shippingAddress = checkout ? checkout.shippingAddress : {};
  const data = shippingAsBilling
    ? (shippingAddress as FormAddressType)
    : formData;

  return {
    billingAddress: {
      city: data.city,
      country: maybe(
        () => data.country.value,
        data.country.code
      ) as CountryCode,
      countryArea: data.countryArea,
      firstName: data.firstName,
      lastName: data.lastName,
      postalCode: data.postalCode,
      streetAddress1: data.streetAddress1,
      streetAddress2: data.streetAddress2,
    },
    checkoutId: checkout ? checkout.id : null,
    email: data.email,
  };
};

const computeCheckoutData = (
  data: FormAddressType,
  lines: CartLineInterface[],
  email?: string
) => ({
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
  email: data.email || email,
  ...(lines && {
    lines: lines.map(({ quantity, variantId }) => ({
      quantity,
      variantId,
    })),
  }),
});

const View: React.FC<IBillingPageProps> = ({
  checkoutId,
  checkout,
  createCheckout: [
    create,
    { loading: createCheckoutLoading, error: createCheckoutError },
  ],
  proceedToNextStepData,
  shippingAsBilling,
  shop,
  update,
  lines,
  updateCheckoutBillingAddress,
  isShippingRequired,
}) => {
  const [saveBillingAddress, { loading, error }] = updateCheckoutBillingAddress;
  const errors = maybe(() => error.extraInfo.userInputErrors, []);

  const onSaveBillingAddressHandler = (formData: FormAddressType) => {
    if (checkoutId) {
      return saveBillingAddress(
        computeMutationVariables(formData, checkout, shippingAsBilling)
      );
    }
    const data = computeCheckoutData(formData, lines);
    return create({
      checkoutInput: {
        billingAddress: data.billingAddress,
        email: data.email,
        lines: data.lines,
      },
    });
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

  return (
    <CartSummary checkout={checkout}>
      <Steps
        step={CheckoutStep.BillingAddress}
        token={proceedToNextStepData.token}
        checkout={checkout}
      >
        <>
          {isShippingRequired && (
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
          )}
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
              noShipping={!isShippingRequired}
              {...billingProps}
            />
          )}
        </>
      </Steps>
    </CartSummary>
  );
};

export default View;
