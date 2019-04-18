import { History } from "history";
import * as React from "react";
import { generatePath, RouteComponentProps } from "react-router";

import {
  FormAddressType,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType
} from "../../../components";
import { ShopContext } from "../../../components/ShopProvider/context";

import {
  CartContext,
  CartLineInterface
} from "../../../components/CartProvider/context";
import { UserContext } from "../../../components/User/context";
import { CartSummary, Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { TypedCreateCheckoutMutation } from "../../queries";
import { shippingOptionsUrl } from "../../routes";
import { createCheckout_checkoutCreate } from "../../types/createCheckout";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";
import ShippingUnavailableModal from "./ShippingUnavailableModal";
import { ICheckoutData } from "./types";
import { updateCheckoutShippingAddress_checkoutShippingAddressUpdate } from "./types/updateCheckoutShippingAddress";

import GuestAddressSelector from "./Guest";
import UserAddressSelector from "./User";

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
  lines?: CartLineInterface[]
): ICheckoutData => ({
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
                                {({ lines }) => (
                                  <UserContext.Consumer>
                                    {({ user }) =>
                                      user ? (
                                        <UserAddressSelector
                                          loading={
                                            updateLoading || createLoading
                                          }
                                          shipping
                                          user={user}
                                          checkout={checkout}
                                          update={update}
                                          onSubmit={address => {
                                            updateCheckout({
                                              variables: {
                                                checkoutId: checkout.id,
                                                email: user.email,
                                                ...computeCheckoutData(address)
                                              }
                                            });
                                          }}
                                        />
                                      ) : (
                                        <GuestAddressSelector
                                          loading={updateLoading}
                                          lines={lines}
                                          shop={shop}
                                          checkout={checkout}
                                          update={update}
                                          createData={createData}
                                          updateData={updateData}
                                          updateCheckout={updateCheckout}
                                          createCheckout={createCheckout}
                                          computeCheckoutData={
                                            computeCheckoutData
                                          }
                                        />
                                      )
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
