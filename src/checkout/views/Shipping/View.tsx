import * as React from "react";
import { RouteComponentProps } from "react-router";

import {
  useCreateCheckout,
  useUpdateCheckoutShippingAddress,
  useUserDetails,
} from "@sdk/react";

import { CartContext } from "../../../components/CartProvider/context";
import { ShopContext } from "../../../components/ShopProvider/context";
import { maybe } from "../../../core/utils";
import { CheckoutContext } from "../../context";
import Page from "./Page";

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    params: { token },
  },
}) => {
  const { data: user } = useUserDetails();
  const createCheckout = useCreateCheckout();
  const updateShippingAddress = useUpdateCheckoutShippingAddress();

  return (
    <CheckoutContext.Consumer>
      {({ update, checkout }) => (
        <ShopContext.Consumer>
          {shop => (
            <CartContext.Consumer>
              {({ lines }) => (
                <Page
                  checkoutId={maybe(() => checkout.id, null)}
                  checkout={checkout}
                  createCheckout={createCheckout}
                  shop={shop}
                  update={update}
                  updateShippingAddress={updateShippingAddress}
                  user={user}
                  proceedToNextStepData={{
                    history,
                    token,
                    update,
                  }}
                  lines={lines}
                />
              )}
            </CartContext.Consumer>
          )}
        </ShopContext.Consumer>
      )}
    </CheckoutContext.Consumer>
  );
};

export default View;
