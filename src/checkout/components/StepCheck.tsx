import * as React from "react";
import { Redirect } from "react-router";

import { useVariantsProducts } from "@sdk/react";

import { Loader } from "../../components";
import { CartContext } from "../../components/CartProvider/context";
import { CheckoutContext } from "../context";
import { useCheckoutStepFromPath, useCheckoutStepState } from "../hooks";
import { baseUrl } from "../routes";

/**
 * Redirector to prevent user from entering invalid step by manually pasting the url.
 */
const StepCheck: React.FC<{
  match?: any;
}> = ({ children, match = {} }) => {
  const {
    loading: checkoutLoading,
    checkout,
    cardData,
    dummyStatus,
  } = React.useContext(CheckoutContext);
  const { lines: cartLines } = React.useContext(CartContext);

  const {
    data: variantsProducts,
    loading: variantsProductsLoading,
  } = useVariantsProducts({
    ids: cartLines ? cartLines.map(line => line.variantId) : [],
  });

  const { params, path } = match;

  const step = useCheckoutStepState(
    checkout,
    variantsProducts,
    cardData,
    dummyStatus
  );
  const stepFromPtah = useCheckoutStepFromPath(path, params && params.token);

  if (checkoutLoading || variantsProductsLoading || !step) {
    return <Loader />;
  }
  if ((!checkout && !variantsProducts) || step < stepFromPtah) {
    return <Redirect to={baseUrl} />;
  }

  return children ? <>{children}</> : null;
};

export default StepCheck;
