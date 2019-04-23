import { get } from "lodash";

import { History } from "history";
import * as React from "react";
import { MutationFn } from "react-apollo";
import { generatePath, RouteComponentProps } from "react-router";

import {
  FormAddressType,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType
} from "../../../components";
import {
  CartContext,
  CartLineInterface
} from "../../../components/CartProvider/context";
import { ShopContext } from "../../../components/ShopProvider/context";
import { UserContext } from "../../../components/User/context";
import { findFormErrors } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  Steps,
  UserAddressSelector
} from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { TypedCreateCheckoutMutation } from "../../queries";
import { shippingOptionsUrl } from "../../routes";
import {
  ICheckoutData,
  ILoggedSubmitArgs,
  IUnloggedSubmitArgs
} from "../../types";
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

const computeCheckoutData = (
  data: FormAddressType,
  lines?: CartLineInterface[],
  email?: string
): ICheckoutData => ({
  email: data.email || email,
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

const onLoggedShippingSubmit = ({
  checkoutId,
  email,
  update,
  updateCheckout
}: ILoggedSubmitArgs) => (address: FormAddressType) => {
  update({
    shippingAsBilling: get(address, "asBilling")
  });
  updateCheckout({
    variables: {
      checkoutId,
      email,
      ...computeCheckoutData(address, null, email)
    }
  });
};

const onUnloggedShippingSubmit = ({
  checkoutId,
  createCheckout,
  lines,
  update,
  updateCheckout
}: IUnloggedSubmitArgs) => (address: FormAddressType) => {
  update({
    shippingAsBilling: get(address, "asBilling")
  });
  if (!checkoutId) {
    createCheckout({
      variables: {
        checkoutInput: computeCheckoutData(address, lines)
      }
    });
  } else {
    updateCheckout({
      variables: {
        checkoutId,
        ...computeCheckoutData(address)
      }
    });
  }
};

const renderUserAddressSelector = ({
  checkout,
  user,
  update,
  updateCheckout,
  updateCheckoutResult
}) => (
  <UserAddressSelector
    loading={updateCheckoutResult.loading}
    shipping
    user={user}
    checkout={checkout}
    update={update}
    checkoutUpdateErrors={findFormErrors(updateCheckoutResult)}
    onSubmit={onLoggedShippingSubmit({
      checkoutId: checkout.id,
      email: user.email,
      update,
      updateCheckout
    })}
  />
);

const renderGuestAddressForm = ({
  checkout,
  createCheckout,
  createCheckoutResult,
  lines,
  shop,
  update,
  updateCheckout,
  updateCheckoutResult
}) => (
  <GuestAddressForm
    buttonText="Continue to Shipping"
    loading={updateCheckoutResult.loading || createCheckoutResult.loading}
    shop={shop}
    checkout={checkout}
    errors={[
      ...findFormErrors(updateCheckoutResult),
      ...findFormErrors(createCheckoutResult)
    ]}
    onSubmit={onUnloggedShippingSubmit({
      checkoutId: checkout.id,
      createCheckout,
      lines,
      update,
      updateCheckout
    })}
  />
);

const View: React.SFC<RouteComponentProps<{ token?: string }>> = ({
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
                        {(createCheckout, createCheckoutResult) => (
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
                            {(updateCheckout, updateCheckoutResult) => (
                              <CartContext.Consumer>
                                {({ lines }) => (
                                  <UserContext.Consumer>
                                    {({ user }) =>
                                      user
                                        ? renderUserAddressSelector({
                                            checkout,
                                            update,
                                            updateCheckout,
                                            updateCheckoutResult,
                                            user
                                          })
                                        : renderGuestAddressForm({
                                            checkout,
                                            createCheckout,
                                            createCheckoutResult,
                                            lines,
                                            shop,
                                            update,
                                            updateCheckout,
                                            updateCheckoutResult
                                          })
                                    }
                                  </UserContext.Consumer>
                                )}
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
