import { History } from "history";
import * as React from "react";
import { generatePath, RouteComponentProps } from "react-router";

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

import { Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutErrors,
  CheckoutStep
} from "../../context";
import { shippingOptionsUrl } from "../../routes";
import { Checkout, Checkout_shippingAddress } from "../../types/Checkout";
import { createCheckout_checkoutCreate } from "../../types/createCheckout";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";
import ShippingUnavailableModal from "./ShippingUnavailableModal";
import { updateCheckoutShippingAddress_checkoutShippingAddressUpdate } from "./types/updateCheckoutShippingAddress";

const proceedToShippingOptions = (
  update: (checkoutData: CheckoutContextInterface) => void,
  history: History,
  overlay: OverlayContextInterface,
  token?: string
) => (
  data:
    | createCheckout_checkoutCreate
    | updateCheckoutShippingAddress_checkoutShippingAddressUpdate
) => {
  const canProceed = !data.errors.length;
  const shippingUnavailable = maybe(
    () => !data.checkout.availableShippingMethods.length,
    true
  );

  if (canProceed) {
    if (shippingUnavailable) {
      overlay.show(OverlayType.modal, OverlayTheme.modal, {
        content: <ShippingUnavailableModal hide={overlay.hide} />
      });
    } else {
      update({ checkout: data.checkout, step: CheckoutStep.ShippingOption });
      history.push(generatePath(shippingOptionsUrl, { token }));
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

const getErrors = (
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

const View: React.SFC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    path,
    params: { token }
  }
}) => {
  let shippingAddress = null;

  return (
    <div className="checkout-shipping">
      <CheckoutContext.Consumer>
        {({ create, update, checkout, errors, loading }) => (
          <Steps path={path} token={token}>
            <OverlayContext.Consumer>
              {overlay => (
                <ShopContext.Consumer>
                  {shop => {
                    const proceedNext = proceedToShippingOptions(
                      update,
                      history,
                      overlay,
                      token
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
                            errors={getErrors(
                              errors,
                              maybe(
                                () => data.checkoutShippingAddressUpdate.errors,
                                []
                              )
                            )}
                            loading={loading || mutationLoading}
                            onSubmit={(evt, data) => {
                              evt.preventDefault();
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
                            }}
                          />
                        )}
                      </TypedUpdateCheckoutShippingAddressMutation>
                    );
                  }}
                </ShopContext.Consumer>
              )}
            </OverlayContext.Consumer>
          </Steps>
        )}
      </CheckoutContext.Consumer>
    </div>
  );
};

export default View;
