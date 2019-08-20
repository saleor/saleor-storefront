import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useUpdateCheckoutBillingAddress, useUserDetails } from "@sdk/react";

import { ShopContext } from "../../../components/ShopProvider/context";
import { maybe } from "../../../core/utils";
import { CheckoutContext } from "../../context";
import Page from "./Page";

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    path,
    params: { token },
  },
}) => {
  const [validateStep, setValidateStep] = React.useState(true);
  const updateCheckoutBillingAddress = useUpdateCheckoutBillingAddress();

  React.useEffect(() => {
    setValidateStep(false);
  }, []);

  const { data: user } = useUserDetails();

  return (
    <CheckoutContext.Consumer>
      {({ update, checkout, shippingAsBilling, step }) => (
        <ShopContext.Consumer>
          {shop => (
            <Page
              shippingAsBilling={shippingAsBilling}
              checkoutId={maybe(() => checkout.id, null)}
              checkout={checkout}
              shop={shop}
              path={path}
              update={update}
              step={step}
              user={user}
              updateCheckoutBillingAddress={updateCheckoutBillingAddress}
              proceedToNextStepData={{
                history,
                token,
                update,
              }}
              validateStep={validateStep}
            />
          )}
        </ShopContext.Consumer>
      )}
    </CheckoutContext.Consumer>
  );
};

export default View;
