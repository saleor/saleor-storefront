import * as H from "history";
import * as React from "react";
import { RouteComponentProps } from "react-router";

import { ShippingAddressForm } from "..";
import { maybe } from "../../core/utils";
import {
  CheckoutContext,
  CheckoutContextInterface
} from "../CheckoutApp/context";
import { checkoutShippingOptionsUrl } from "../CheckoutApp/routes";
import { Checkout } from "../CheckoutApp/types/Checkout";
import { ShopContext } from "../ShopProvider/context";
import { getShop_shop } from "../ShopProvider/types/getShop";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";
import { updateCheckoutShippingAddress } from "./types/updateCheckoutShippingAddress";

const proceedToShippingOptions = (
  data: updateCheckoutShippingAddress,
  checkoutCtx: CheckoutContextInterface,
  history: H.History
) => {
  const canProceed = maybe(
    () =>
      !data.checkoutShippingAddressUpdate.errors.length &&
      !data.checkoutEmailUpdate.errors.length
  );

  if (canProceed) {
    checkoutCtx.updateCheckout({
      checkout: data.checkoutEmailUpdate.checkout
    });
    history.push(checkoutShippingOptionsUrl(checkoutCtx.checkout.token));
  }
};

const extractShippingData = (checkout: Checkout, shop: getShop_shop) => {
  const hasShippingCountry = maybe(() => !!checkout.shippingAddress.country);

  if (hasShippingCountry) {
    return { ...checkout.shippingAddress, email: checkout.email };
  }

  const { geolocalization, defaultCountry } = shop;
  return {
    ...checkout.shippingAddress,
    country: {
      code: geolocalization.country
        ? geolocalization.country.code
        : defaultCountry.code,
      country: geolocalization.country
        ? geolocalization.country.country
        : defaultCountry.country
    },
    email: checkout.email
  };
};

const computeMutationVariables = (data: any, checkout: Checkout) => ({
  variables: {
    checkoutId: checkout.id,
    email: data.email,
    shippingAddress: {
      city: data.city,
      companyName: data.companyName,
      country: data.country.value || data.country.code,
      countryArea: data.countryArea,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      postalCode: data.postalCode,
      streetAddress1: data.streetAddress1,
      streetAddress2: data.streetAddress2
    }
  }
});

const CheckoutShipping: React.SFC<RouteComponentProps<{ id }>> = ({
  history
}) => (
  <div className="checkout-shipping">
    <CheckoutContext.Consumer>
      {checkoutCtx => {
        const { checkout } = checkoutCtx;
        return (
          <>
            <div className="checkout__step">
              <span>1</span>
              <h4 className="checkout__header">Shipping Address</h4>
            </div>

            <TypedUpdateCheckoutShippingAddressMutation
              onCompleted={data =>
                proceedToShippingOptions(data, checkoutCtx, history)
              }
            >
              {(saveShippingAddress, { data, loading }) => {
                return (
                  <div className="checkout__content">
                    <ShopContext.Consumer>
                      {shop => {
                        return (
                          <ShippingAddressForm
                            data={extractShippingData(checkout, shop)}
                            buttonText="Continue to Shipping"
                            errors={maybe(
                              () => data.checkoutShippingAddressUpdate.errors,
                              []
                            )}
                            loading={loading}
                            onSubmit={(evt, data) => {
                              saveShippingAddress(
                                computeMutationVariables(data, checkout)
                              );
                              checkoutCtx.updateCheckout({
                                shippingAsBilling: data.asBilling
                              });
                              evt.preventDefault();
                            }}
                          />
                        );
                      }}
                    </ShopContext.Consumer>
                  </div>
                );
              }}
            </TypedUpdateCheckoutShippingAddressMutation>
            <div className="checkout__step">
              <span>2</span>
              <h4 className="checkout__header">Shipping Method</h4>
            </div>
            <div className="checkout__step">
              <span>3</span>
              <h4 className="checkout__header">Billing</h4>
            </div>
            <div className="checkout__step">
              <span>4</span>
              <h4 className="checkout__header">Payment Method</h4>
            </div>
          </>
        );
      }}
    </CheckoutContext.Consumer>
  </div>
);

export default CheckoutShipping;
