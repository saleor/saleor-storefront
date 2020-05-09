import * as React from "react";
import { RouteComponentProps } from "react-router";

// import {
//   useCreateCheckout,
//   useUpdateCheckoutShippingAddress,
//   useUserDetails,
// } from "@sdk/react";


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
                />
              )}
            </CartContext.Consumer>
          )}
        </ShopContext.Consumer>
      )}
    </CheckoutContext.Consumer>
  )
}

export default View;