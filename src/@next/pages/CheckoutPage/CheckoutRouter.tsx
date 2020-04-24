import React from "react";
import { Redirect } from "react-router";
import {
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
} from "react-router-dom";

import { useCheckoutStepFromPath } from "@hooks";
import { CHECKOUT_STEPS, CheckoutStep } from "@temp/core/config";

interface IRouterProps {
  step: CheckoutStep;
  renderAddress: (props: RouteComponentProps<any>) => React.ReactNode;
  renderShipping: (props: RouteComponentProps<any>) => React.ReactNode;
  renderPayment: (props: RouteComponentProps<any>) => React.ReactNode;
  renderReview: (props: RouteComponentProps<any>) => React.ReactNode;
}

const CheckoutRouter: React.FC<IRouterProps> = ({
  step,
  renderAddress,
  renderShipping,
  renderPayment,
  renderReview,
}: IRouterProps) => {
  const { pathname } = useLocation();
  const stepFromPath = useCheckoutStepFromPath(pathname);

  const getStepLink = () =>
    CHECKOUT_STEPS.find(stepObj => stepObj.step === step)?.link ||
    CHECKOUT_STEPS[0].link;

  if (!stepFromPath || (stepFromPath && step < stepFromPath)) {
    return <Redirect to={getStepLink()} />;
  }

  return (
    <Switch>
      <Route path={CHECKOUT_STEPS[0].link} render={renderAddress} />
      <Route path={CHECKOUT_STEPS[1].link} render={renderShipping} />
      <Route path={CHECKOUT_STEPS[2].link} render={renderPayment} />
      <Route path={CHECKOUT_STEPS[3].link} render={renderReview} />
      <Route render={props => <Redirect {...props} to={getStepLink()} />} />
    </Switch>
  );
};

export { CheckoutRouter };
