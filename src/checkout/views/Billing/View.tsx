import { History } from "history";
import * as React from "react";
import { generatePath, RouteComponentProps } from "react-router";

import { FormAddressType, ShippingAddressForm } from "../../../components";
import { ShopContext } from "../../../components/ShopProvider/context";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";
import { Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { paymentUrl } from "../../routes";
import { Checkout, Checkout_billingAddress } from "../../types/Checkout";
import { TypedUpdateCheckoutBillingAddressMutation } from "./queries";
import { updateCheckoutBillingAddress } from "./types/updateCheckoutBillingAddress";

const proceedToPayment = (
  data: updateCheckoutBillingAddress,
  update: (checkoutData: CheckoutContextInterface) => void,
  history: History,
  token?: string
) => {
  const canProceed = !data.checkoutBillingAddressUpdate.errors.length;

  if (canProceed) {
    update({
      checkout: data.checkoutBillingAddressUpdate.checkout,
      step: CheckoutStep.Payment
    });
    history.push(generatePath(paymentUrl, { token }));
  }
};

const extractBillingData = (
  address: Checkout_billingAddress,
  shop: getShop_shop
) => {
  const hasAddress = maybe(() => !!address.country);
  if (hasAddress) {
    return address;
  }

  const { geolocalization, defaultCountry } = shop;
  return {
    ...address,
    country: {
      code: geolocalization.country
        ? geolocalization.country.code
        : defaultCountry.code,
      country: geolocalization.country
        ? geolocalization.country.country
        : defaultCountry.country
    }
  };
};

const computeMutationVariables = (
  data: FormAddressType,
  checkout: Checkout
) => ({
  variables: {
    billingAddress: {
      city: data.city,
      country: data.country.value || data.country.code,
      countryArea: data.countryArea,
      firstName: data.firstName,
      lastName: data.lastName,
      postalCode: data.postalCode,
      streetAddress1: data.streetAddress1,
      streetAddress2: data.streetAddress2
    },
    checkoutId: checkout.id
  }
});

const View: React.SFC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    path,
    params: { token }
  }
}) => (
  <div>
    <CheckoutContext.Consumer>
      {({ checkout, shippingAsBilling, update }) => {
        const address =
          !checkout.billingAddress && shippingAsBilling
            ? checkout.shippingAddress
            : checkout.billingAddress;

        return (
          <Steps path={path} token={token} checkout={checkout}>
            <TypedUpdateCheckoutBillingAddressMutation
              onCompleted={data =>
                proceedToPayment(data, update, history, token)
              }
            >
              {(saveBillingAddress, { data, loading }) => (
                <ShopContext.Consumer>
                  {shop => (
                    <ShippingAddressForm
                      buttonText="Continue to Payment"
                      billing
                      data={extractBillingData(address, shop)}
                      errors={maybe(
                        () => data.checkoutBillingAddressUpdate.errors,
                        []
                      )}
                      loading={loading}
                      onSubmit={(event, formData) => {
                        saveBillingAddress(
                          computeMutationVariables(formData, checkout)
                        );
                        event.preventDefault();
                      }}
                    />
                  )}
                </ShopContext.Consumer>
              )}
            </TypedUpdateCheckoutBillingAddressMutation>
          </Steps>
        );
      }}
    </CheckoutContext.Consumer>
  </div>
);

export default View;
