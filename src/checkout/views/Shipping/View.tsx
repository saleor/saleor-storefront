import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useUserDetails } from "@sdk/react";

import { CartContext } from "../../../components/CartProvider/context";
import { ShopContext } from "../../../components/ShopProvider/context";
import { maybe } from "../../../core/utils";
import { CheckoutContext } from "../../context";
import { TypedCreateCheckoutMutation } from "../../queries";
import Page from "./Page";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    params: { token },
  },
}) => {
  const { data: user } = useUserDetails();

  return (
    <CheckoutContext.Consumer>
      {({ update, checkout }) => (
        <ShopContext.Consumer>
          {shop => (
            <TypedCreateCheckoutMutation>
              {createCheckout => (
                <TypedUpdateCheckoutShippingAddressMutation>
                  {updateCheckout => (
                    <CartContext.Consumer>
                      {({ lines }) => (
                        <Page
                          checkoutId={maybe(() => checkout.id, null)}
                          checkout={checkout}
                          createCheckout={createCheckout}
                          shop={shop}
                          update={update}
                          updateCheckout={updateCheckout}
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
                </TypedUpdateCheckoutShippingAddressMutation>
              )}
            </TypedCreateCheckoutMutation>
          )}
        </ShopContext.Consumer>
      )}
    </CheckoutContext.Consumer>
  );
};

export default View;
