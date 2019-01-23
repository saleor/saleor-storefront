import { History } from "history";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import {
  AddressSummary,
  FormAddressType,
  ShippingAddressForm
} from "../../../components";
import { ShopContext } from "../../../components/ShopProvider/context";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";
import { CheckoutContext, CheckoutContextInterface } from "../../context";
import { baseUrl, paymentUrl, shippingOptionsUrl } from "../../routes";
import { Checkout, Checkout_billingAddress } from "../../types/Checkout";
import { TypedUpdateCheckoutBillingAddressMutation } from "./queries";
import { updateCheckoutBillingAddress } from "./types/updateCheckoutBillingAddress";

const proceedToPayment = (
  data: updateCheckoutBillingAddress,
  checkoutCtx: CheckoutContextInterface,
  history: History
) => {
  const canProceed = !data.checkoutBillingAddressUpdate.errors.length;

  if (canProceed) {
    checkoutCtx.update({
      checkout: data.checkoutBillingAddressUpdate.checkout
    });
    history.push(paymentUrl);
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

const View: React.SFC<RouteComponentProps<{ id }>> = ({ history }) => (
  <div>
    <CheckoutContext.Consumer>
      {checkoutCtx => {
        const { checkout, shippingAsBilling, update } = checkoutCtx;
        const address =
          !checkout.billingAddress && shippingAsBilling
            ? checkout.shippingAddress
            : checkout.billingAddress;
        return (
          <>
            <Link to={baseUrl}>
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
            <Link to={shippingOptionsUrl}>
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

export default View;
