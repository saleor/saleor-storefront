import * as React from "react";
import { RouteComponentProps } from "react-router";

import {
  useCreateCheckout,
  useUpdateCheckoutBillingAddress,
  useUserDetails,
  useVariantsProducts,
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
  const updateCheckoutBillingAddress = useUpdateCheckoutBillingAddress();

  const { data: user } = useUserDetails();

  const { update, checkout, shippingAsBilling } = React.useContext(
    CheckoutContext
  );
  const { lines: cardLines } = React.useContext(CartContext);
  const { data: variantsProducts } = useVariantsProducts({
    ids: cardLines ? cardLines.map(line => line.variantId) : [],
  });
  const isShippingRequired = () => {
    if (checkout && checkout.isShippingRequired) {
      return true;
    } else if (checkout) {
      return false;
    } else if (variantsProducts) {
      const isShippingRequired =
        variantsProducts.edges &&
        variantsProducts.edges.some(
          ({ node }) => node.product.productType.isShippingRequired
        );
      if (isShippingRequired) {
        return true;
      }
      return false;
    }
    return false;
  };

  const createCheckout = useCreateCheckout();

  return (
    <ShopContext.Consumer>
      {shop => (
        <Page
          isShippingRequired={isShippingRequired()}
          shippingAsBilling={shippingAsBilling}
          checkoutId={maybe(() => checkout.id, null)}
          checkout={checkout}
          shop={shop}
          createCheckout={createCheckout}
          update={update}
          user={user}
          updateCheckoutBillingAddress={updateCheckoutBillingAddress}
          proceedToNextStepData={{
            history,
            token,
            update,
          }}
          lines={cardLines}
        />
      )}
    </ShopContext.Consumer>
  );
};

export default View;
