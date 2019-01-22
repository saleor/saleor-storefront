import { History } from "history";
import * as React from "react";
import { RouteComponentProps } from "react-router";

import {
  FormAddressType,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
  ShippingAddressForm
} from "../../../components";
import { ShopContext } from "../../../components/ShopProvider/context";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";
import { CheckoutContext, CheckoutContextInterface } from "../../context";
import { checkoutShippingOptionsUrl } from "../../routes";
import { Checkout } from "../../types/Checkout";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";
import ShippingUnavailableModal from "./ShippingUnavailableModal";
import { updateCheckoutShippingAddress } from "./types/updateCheckoutShippingAddress";

const proceedToShippingOptions = (
  data: updateCheckoutShippingAddress,
  checkoutCtx: CheckoutContextInterface,
  history: History,
  overlay: OverlayContextInterface
) => {
  const canProceed =
    !data.checkoutShippingAddressUpdate.errors.length &&
    !data.checkoutEmailUpdate.errors.length;
  const shippingUnavailable = maybe(
    () => !data.checkoutEmailUpdate.checkout.availableShippingMethods.length
  );

  if (canProceed) {
    if (shippingUnavailable) {
      overlay.show(OverlayType.modal, OverlayTheme.modal, {
        content: <ShippingUnavailableModal hide={overlay.hide} />
      });
    } else {
      checkoutCtx.updateCheckout({
        checkout: data.checkoutEmailUpdate.checkout
      });
      history.push(checkoutShippingOptionsUrl(checkoutCtx.checkout.token));
    }
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

const computeMutationVariables = (
  data: FormAddressType,
  checkout: Checkout
) => ({
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

const View: React.SFC<RouteComponentProps<{ id }>> = ({ history }) => (
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
            <OverlayContext.Consumer>
              {overlay => (
                <TypedUpdateCheckoutShippingAddressMutation
                  onCompleted={data =>
                    proceedToShippingOptions(
                      data,
                      checkoutCtx,
                      history,
                      overlay
                    )
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
                                  () =>
                                    data.checkoutShippingAddressUpdate.errors,
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
              )}
            </OverlayContext.Consumer>
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

export default View;
