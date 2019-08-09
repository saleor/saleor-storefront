import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useUserDetails } from "@sdk/react";

import { ShopContext } from "../../../components/ShopProvider/context";
import { maybe } from "../../../core/utils";
import { CheckoutContext } from "../../context";
import Page from "./Page";
import { TypedUpdateCheckoutBillingAddressMutation } from "./queries";

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    path,
    params: { token },
  },
}) => {
  const [validateStep, setValidateStep] = React.useState(true);

  React.useEffect(() => {
    setValidateStep(false);
  }, []);

  const { data: user } = useUserDetails();

  return (
    <CheckoutContext.Consumer>
      {({ update, checkout, shippingAsBilling, step }) => (
        <ShopContext.Consumer>
          {shop => (
            <TypedUpdateCheckoutBillingAddressMutation>
              {saveBillingAddress => (
                <Page
                  shippingAsBilling={shippingAsBilling}
                  checkoutId={maybe(() => checkout.id, null)}
                  checkout={checkout}
                  shop={shop}
                  path={path}
                  update={update}
                  saveBillingAddress={saveBillingAddress}
                  step={step}
                  user={user}
                  proceedToNextStepData={{
                    history,
                    token,
                    update,
                  }}
                  validateStep={validateStep}
                />
              )}
            </TypedUpdateCheckoutBillingAddressMutation>
          )}
        </ShopContext.Consumer>
      )}
    </CheckoutContext.Consumer>
  );
};

export default View;
