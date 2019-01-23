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
import { FormError } from "../../../components/Form";
import { ShopContext } from "../../../components/ShopProvider/context";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutErrors,
  CheckoutStep
} from "../../context";
import { shippingOptionsUrl } from "../../routes";
import { Checkout, Checkout_shippingAddress } from "../../types/Checkout";
import { createCheckout_checkoutCreate } from "../../types/createCheckout";
import Steps from "../Steps";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";
import ShippingUnavailableModal from "./ShippingUnavailableModal";
import { updateCheckoutShippingAddress_checkoutShippingAddressUpdate } from "./types/updateCheckoutShippingAddress";

const proceedToShippingOptions = (
  update: (checkoutData: CheckoutContextInterface) => void,
  history: History,
  overlay: OverlayContextInterface
) => (
  data:
    | createCheckout_checkoutCreate
    | updateCheckoutShippingAddress_checkoutShippingAddressUpdate
) => {
  const canProceed = !data.errors.length;
  const shippingUnavailable = maybe(
    () => !data.checkout.availableShippingMethods.length
  );

  if (canProceed) {
    if (shippingUnavailable) {
      overlay.show(OverlayType.modal, OverlayTheme.modal, {
        content: <ShippingUnavailableModal hide={overlay.hide} />
      });
    } else {
      update({ checkout: data.checkout, step: CheckoutStep.ShippingOption });
      history.push(shippingOptionsUrl);
    }
  }
};

const extractShippingData = (
  checkout: Checkout,
  shop: getShop_shop,
  shippingAddress: Checkout_shippingAddress
) => {
  const hasShippingCountry = maybe(() => !!checkout.shippingAddress.country);

  if (hasShippingCountry) {
    return { ...checkout.shippingAddress, email: checkout.email };
  }

  const { geolocalization, defaultCountry } = shop;
  const country = {
    code: geolocalization.country
      ? geolocalization.country.code
      : defaultCountry.code,
    country: geolocalization.country
      ? geolocalization.country.country
      : defaultCountry.country
  };

  if (!checkout) {
    return { country, ...shippingAddress };
  }

  return { ...checkout.shippingAddress, country, email: checkout.email };
};

const computeCheckoutData = (data: FormAddressType) => ({
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
});

const extractErrors = (
  createErrors: CheckoutErrors,
  updateErrors: CheckoutErrors
): FormError[] => {
  if (createErrors.length) {
    return createErrors;
  }
  if (updateErrors.length) {
    return updateErrors;
  }
  return [];
};

const View: React.SFC<RouteComponentProps<{ id }>> = ({ history }) => {
  let shippingAddress = null;

  return (
    <div className="checkout-shipping">
      <CheckoutContext.Consumer>
        {({ create, update, checkout, step, errors, loading }) => {
          return (
            <Steps currentStep={step}>
              <OverlayContext.Consumer>
                {overlay => (
                  <div className="checkout__content">
                    <ShopContext.Consumer>
                      {shop => {
                        const proceedNext = proceedToShippingOptions(
                          update,
                          history,
                          overlay
                        );
                        return (
                          <TypedUpdateCheckoutShippingAddressMutation
                            onCompleted={({ checkoutShippingAddressUpdate }) =>
                              proceedNext(checkoutShippingAddressUpdate)
                            }
                          >
                            {(
                              saveShippingAddress,
                              { loading: mutationLoading, data }
                            ) => (
                              <ShippingAddressForm
                                data={extractShippingData(
                                  checkout,
                                  shop,
                                  shippingAddress
                                )}
                                buttonText="Continue to Shipping"
                                errors={extractErrors(
                                  errors,
                                  data.checkoutShippingAddressUpdate.errors
                                )}
                                loading={loading || mutationLoading}
                                onSubmit={(evt, data) => {
                                  shippingAddress = data;
                                  if (!checkout) {
                                    (async () => {
                                      proceedNext(
                                        await create(computeCheckoutData(data))
                                      );
                                    })();
                                  } else {
                                    saveShippingAddress({
                                      variables: {
                                        checkoutId: checkout.id,
                                        ...computeCheckoutData(data)
                                      }
                                    });
                                  }
                                  evt.preventDefault();
                                }}
                              />
                            )}
                          </TypedUpdateCheckoutShippingAddressMutation>
                        );
                      }}
                    </ShopContext.Consumer>
                  </div>
                )}
              </OverlayContext.Consumer>
            </Steps>
          );
        }}
      </CheckoutContext.Consumer>
    </div>
  );
};

export default View;
