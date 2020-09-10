import React from "react";
import { Redirect } from "react-router";
import {
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
} from "react-router-dom";

import { useCheckoutStepFromPath, useCheckoutStepState } from "@hooks";
import { IItems, ITotalPrice } from "@saleor/sdk/lib/api/Cart/types";
import { ICheckout, IPayment } from "@saleor/sdk/lib/api/Checkout/types";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { checkIfShippingRequiredForProducts } from "@utils/core";

interface IRouterProps {
  items?: IItems;
  checkout?: ICheckout;
  payment?: IPayment;
  totalPrice?: ITotalPrice;
  renderAddress: (props: RouteComponentProps<any>) => React.ReactNode;
  renderShipping: (props: RouteComponentProps<any>) => React.ReactNode;
  renderPayment: (props: RouteComponentProps<any>) => React.ReactNode;
  renderReview: (props: RouteComponentProps<any>) => React.ReactNode;
}

const CheckoutRouter: React.FC<IRouterProps> = ({
  items,
  checkout,
  payment,
  totalPrice,
  renderAddress,
  renderShipping,
  renderPayment,
  renderReview,
}: IRouterProps) => {
  const { pathname } = useLocation();
  const { recommendedStep, maxPossibleStep } = useCheckoutStepState(
    items,
    checkout,
    payment,
    totalPrice
  );
  const stepFromPath = useCheckoutStepFromPath(pathname);

  const isShippingRequiredForProducts = checkIfShippingRequiredForProducts(
    items
  );

  const getStepLink = () =>
    CHECKOUT_STEPS.find(stepObj => stepObj.step === recommendedStep)?.link ||
    CHECKOUT_STEPS[0].link;

  if (
    (pathname !== CHECKOUT_STEPS[4].link &&
      (!stepFromPath || (stepFromPath && maxPossibleStep < stepFromPath))) ||
    (pathname === CHECKOUT_STEPS[1].link && !isShippingRequiredForProducts)
  ) {
    return <Redirect to={getStepLink()} />;
  }

  return (
    <Switch>
      <Route path={CHECKOUT_STEPS[4].link} render={renderReview} />
      <Route path={CHECKOUT_STEPS[0].link} render={renderAddress} />
      <Route path={CHECKOUT_STEPS[1].link} render={renderShipping} />
      <Route path={CHECKOUT_STEPS[2].link} render={renderPayment} />
      <Route path={CHECKOUT_STEPS[3].link} render={renderReview} />
      <Route render={props => <Redirect {...props} to={getStepLink()} />} />
    </Switch>
  );
};

export { CheckoutRouter };
