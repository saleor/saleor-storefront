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

import {
  CartContext,
  CartLineInterface
} from "../../../components/CartProvider/context";
import { CartSummary, Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { TypedCreateCheckoutMutation } from "../../queries";
import { shippingOptionsUrl } from "../../routes";
import { Checkout } from "../../types/Checkout";
import {
  createCheckout,
  createCheckout_checkoutCreate
} from "../../types/createCheckout";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";
import ShippingUnavailableModal from "./ShippingUnavailableModal";
import {
  updateCheckoutShippingAddress,
  updateCheckoutShippingAddress_checkoutShippingAddressUpdate
} from "./types/updateCheckoutShippingAddress";

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

  if (canProceed) {
    const shippingUnavailable = !data.checkout.availableShippingMethods.length;

    if (shippingUnavailable) {
      overlay.show(OverlayType.modal, OverlayTheme.modal, {
        content: <ShippingUnavailableModal hide={overlay.hide} />
      });
    } else {
      update({ checkout: data.checkout });
      history.push(generatePath(shippingOptionsUrl, { token }));
    }
  }
};

const extractShippingData = (checkout: Checkout, shop: getShop_shop) => {
  const hasShippingCountry = !!maybe(() => checkout.shippingAddress.country);

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
    return { country };
  }

  return { ...checkout.shippingAddress, country, email: checkout.email };
};

const computeCheckoutData = (
  data: FormAddressType,
  lines?: CartLineInterface[]
) => ({
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
  },
  ...(lines && {
    lines: lines.map(({ quantity, variantId }) => ({
      quantity,
      variantId
    }))
  })
});

const getErrors = (
  createData: createCheckout,
  updateData: updateCheckoutShippingAddress
): FormError[] => {
  const createErrors = maybe(() => createData.checkoutCreate.errors, []);
  const updateErrors = maybe(
    () => [
      ...updateData.checkoutShippingAddressUpdate.errors,
      ...updateData.checkoutEmailUpdate.errors
    ],
    []
  );
  return [...createErrors, ...updateErrors];
};

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    params: { token }
  }
}) => (
  <CheckoutContext.Consumer>
    {({ update, checkout }) => (
      <CartSummary checkout={checkout}>
        <div className="checkout-shipping">
          <Steps step={CheckoutStep.ShippingAddress} token={token}>
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
                      <TypedCreateCheckoutMutation
                        onCompleted={({ checkoutCreate }) =>
                          proceedNext(checkoutCreate)
                        }
                      >
                        {(
                          createCheckout,
                          { data: createData, loading: createLoading }
                        ) => (
                          <TypedUpdateCheckoutShippingAddressMutation
                            onCompleted={({
                              checkoutShippingAddressUpdate,
                              checkoutEmailUpdate
                            }) => {
                              if (!checkoutEmailUpdate.errors.length) {
                                proceedNext(checkoutShippingAddressUpdate);
                              }
                            }}
                          >
                            {(
                              updateCheckout,
                              { data: updateData, loading: updateLoading }
                            ) => (
                              <CartContext.Consumer>
                                {({ lines }) => {
                                  return (
                                    <ShippingAddressForm
                                      data={extractShippingData(checkout, shop)}
                                      buttonText="Continue to Shipping"
                                      errors={getErrors(createData, updateData)}
                                      loading={createLoading || updateLoading}
                                      onSubmit={(evt, formData) => {
                                        evt.preventDefault();
                                        update({
                                          shippingAsBilling: formData.asBilling
                                        });
                                        if (!checkout) {
                                          createCheckout({
                                            variables: {
                                              checkoutInput: computeCheckoutData(
                                                formData,
                                                lines
                                              )
                                            }
                                          });
                                        } else {
                                          updateCheckout({
                                            variables: {
                                              checkoutId: checkout.id,
                                              email: formData.email,
                                              ...computeCheckoutData(formData)
                                            }
                                          });
                                        }
                                      }}
                                    />
                                  );
                                }}
                              </CartContext.Consumer>
                            )}
                          </TypedUpdateCheckoutShippingAddressMutation>
                        )}
                      </TypedCreateCheckoutMutation>
                    );
                  }}
                </ShopContext.Consumer>
              )}
            </OverlayContext.Consumer>
          </Steps>
        </div>
      </CartSummary>
    )}
  </CheckoutContext.Consumer>
);

export default View;
