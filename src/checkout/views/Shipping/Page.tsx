import * as React from "react";
import { generatePath } from "react-router";

import { FormAddressType } from "../../../components";
import { CartLineInterface } from "../../../components/CartProvider/context";
import { maybe } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  Steps,
  UserAddressSelector,
} from "../../components";
import { CheckoutStep } from "../../context";
import { shippingOptionsUrl } from "../../routes";
import { ICheckoutData, ICheckoutUserArgs } from "../../types";
import { IShippingPageProps } from "./types";

import { CountryCode } from "types/globalTypes";

const computeCheckoutData = (
  data: FormAddressType,
  lines: CartLineInterface[],
  email?: string
): ICheckoutData => ({
  email: data.email || email,
  shippingAddress: {
    city: data.city,
    companyName: data.companyName,
    country: (data.country.value || data.country.code) as CountryCode,
    countryArea: data.countryArea,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    postalCode: data.postalCode,
    streetAddress1: data.streetAddress1,
    streetAddress2: data.streetAddress2,
  },
  ...(lines && {
    lines: lines.map(({ quantity, variantId }) => ({
      quantity,
      variantId,
    })),
  }),
});

const Page: React.FC<IShippingPageProps> = ({
  checkoutId,
  checkout,
  createCheckout: [
    create,
    { loading: createCheckoutLoading, error: createCheckoutError },
  ],
  proceedToNextStepData,
  shop,
  user,
  lines,
  update,
  updateShippingAddress: [
    updateAddress,
    { loading: updateAddressLoading, error: updateAddressError },
  ],
}) => {
  const errors = maybe(
    () => createCheckoutError.extraInfo.userInputErrors,
    maybe(() => updateAddressError.extraInfo.userInputErrors, [])
  );
  const loading = createCheckoutLoading || updateAddressLoading;
  const email = maybe(() => user.email, null);

  const onSaveShippingAddressHandler = async (formData: FormAddressType) => {
    if (!checkoutId) {
      const data = computeCheckoutData(formData, lines);
      return create({
        checkoutInput: {
          email: data.email,
          lines: data.lines,
          shippingAddress: data.shippingAddress,
        },
      });
    }
    const data = computeCheckoutData(formData, null, email);
    return updateAddress({
      checkoutId,
      email: data.email,
      shippingAddress: data.shippingAddress,
    });
  };

  const onProceedToShippingSubmit = async (formData: FormAddressType) => {
    const { update, history, token } = proceedToNextStepData;

    const result = await onSaveShippingAddressHandler(formData);
    const canProceed = !!result;

    if (canProceed) {
      update({
        checkout: result.data.checkout || checkout,
        shippingAsBilling: maybe(() => formData.asBilling, false),
      });
      history.push(
        generatePath(shippingOptionsUrl, {
          token,
        })
      );
    }
  };

  const onSubmitHandler = (address: FormAddressType) => {
    return new Promise<boolean>(async resolve => {
      const result = await onSaveShippingAddressHandler(address);
      resolve(!!result);
    });
  };

  const getShippingProps = (userCheckoutData: ICheckoutUserArgs) => ({
    buttonText: "Continue to Shipping",
    errors,
    loading,
    proceedToNextStep: onProceedToShippingSubmit,
    ...userCheckoutData,
  });

  const shippingProps = getShippingProps({
    checkout,
    user,
  });

  return (
    <CartSummary checkout={checkout}>
      <div className="checkout-shipping">
        <Steps
          step={CheckoutStep.ShippingAddress}
          token={proceedToNextStepData.token}
          checkout={checkout}
        >
          {user ? (
            <UserAddressSelector
              {...shippingProps}
              update={update}
              onSubmit={onSubmitHandler}
              type="shipping"
            />
          ) : (
            <GuestAddressForm {...shippingProps} shop={shop} />
          )}
        </Steps>
      </div>
    </CartSummary>
  );
};

export default Page;
