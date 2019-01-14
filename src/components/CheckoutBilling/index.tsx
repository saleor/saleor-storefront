import * as H from "history";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { AddressSummary, ShippingAddressForm } from "..";
import { maybe } from "../../core/utils";
import {
  CheckoutContext,
  CheckoutContextInterface
} from "../CheckoutApp/context";
import {
  checkoutBaseUrl,
  checkoutPaymentUrl,
  checkoutShippingOptionsUrl
} from "../CheckoutApp/routes";
import {
  Checkout,
  Checkout_billingAddress
} from "../CheckoutApp/types/Checkout";
import { ShopContext } from "../ShopProvider/context";
import { getShop_shop } from "../ShopProvider/types/getShop";
import { TypedUpdateCheckoutBillingAddressMutation } from "./queries";
import { updateCheckoutBillingAddress } from "./types/updateCheckoutBillingAddress";

const proceedToPayment = (
  data: updateCheckoutBillingAddress,
  checkoutCtx: CheckoutContextInterface,
  history: H.History
) => {
  if (data && data.checkoutBillingAddressUpdate.errors.length === 0) {
    checkoutCtx.updateCheckout({
      checkout: data.checkoutBillingAddressUpdate.checkout
    });
    history.push(checkoutPaymentUrl(checkoutCtx.checkout.token));
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

const computeMutationVariables = (data: any, checkout: Checkout) => ({
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

const CheckoutBilling: React.SFC<RouteComponentProps<{ id }>> = ({
  history
}) => (
  <div>
    <CheckoutContext.Consumer>
      {checkoutCtx => {
        const { checkout, shippingAsBilling, updateCheckout } = checkoutCtx;
        const address =
          !checkout.billingAddress && shippingAsBilling
            ? checkout.shippingAddress
            : checkout.billingAddress;
        return (
          <>
            <Link to={checkoutBaseUrl(checkout.token)}>
              <div className="checkout__step checkout__step--inactive">
                <span>1</span>
                <h4 className="checkout__header">Shipping Address</h4>
              </div>
            </Link>
            <div className="checkout__content">
              <AddressSummary
                address={checkout.shippingAddress}
                email={checkout.email}
              />
            </div>
            <Link to={checkoutShippingOptionsUrl(checkout.token)}>
              <div className="checkout__step checkout__step--inactive">
                <span>2</span>
                <h4 className="checkout__header">Shipping Method</h4>
              </div>
            </Link>
            <div className="checkout__content">
              <p>
                {`${checkout.shippingMethod.name} | +${
                  checkout.shippingMethod.price.localized
                }`}
              </p>
            </div>
            <div className="checkout__step">
              <span>3</span>
              <h4 className="checkout__header">Billing Address</h4>
            </div>
            <TypedUpdateCheckoutBillingAddressMutation
              onCompleted={data => proceedToPayment(data, checkoutCtx, history)}
            >
              {(saveBillingAddress, { data, loading }) => (
                <div className="checkout__content">
                  <ShopContext.Consumer>
                    {shopCtx => (
                      <ShippingAddressForm
                        buttonText="Continue to Payment"
                        billing
                        data={extractBillingData(address, shopCtx)}
                        errors={maybe(
                          () => data.checkoutBillingAddressUpdate.errors,
                          []
                        )}
                        loading={loading}
                        onSubmit={(event, data) => {
                          saveBillingAddress(
                            computeMutationVariables(data, checkout)
                          );
                          event.preventDefault();
                        }}
                      />
                    )}
                  </ShopContext.Consumer>
                </div>
              )}
            </TypedUpdateCheckoutBillingAddressMutation>
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

export default CheckoutBilling;
