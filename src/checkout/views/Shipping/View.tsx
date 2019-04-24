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
import {
  CartContext,
  CartLineInterface
} from "../../../components/CartProvider/context";
import { ShopContext } from "../../../components/ShopProvider/context";
import { UserContext } from "../../../components/User/context";
import { findFormErrors, maybe } from "../../../core/utils";
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
import { ICheckoutData, ISubmitArgs } from "../../types";
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

const onShippingSubmit = ({
  checkoutId,
  createCheckout,
  email,
  lines,
  update,
  updateCheckout
}: ISubmitArgs) => (address: FormAddressType) => {
  update({
    shippingAsBilling: maybe(() => address.asBilling, false)
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
        ...computeCheckoutData(address, null, email)
      }
    });
  }
};

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
          <Steps
            step={CheckoutStep.ShippingAddress}
            token={token}
            checkout={checkout}
          >
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
                                    {({ user }) => {
                                      const shippingProps = {
                                        buttonText: "Continue to Shipping",
                                        checkout,
                                        errors: [
                                          ...findFormErrors(
                                            updateCheckoutResult
                                          ),
                                          ...findFormErrors(
                                            createCheckoutResult
                                          )
                                        ],
                                        loading:
                                          updateCheckoutResult.loading ||
                                          createCheckoutResult.loading,

                                        onSubmit: onShippingSubmit({
                                          checkoutId: maybe(
                                            () => checkout.id,
                                            null
                                          ),
                                          createCheckout,
                                          email: maybe(() => user.email, null),
                                          lines,
                                          update,
                                          updateCheckout
                                        }),
                                        user
                                      };

                                      return user ? (
                                        <UserAddressSelector
                                          {...shippingProps}
                                          update={update}
                                          type="shipping"
                                        />
                                      ) : (
                                        <GuestAddressForm
                                          {...shippingProps}
                                          shop={shop}
                                        />
                                      );
                                    }}
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
