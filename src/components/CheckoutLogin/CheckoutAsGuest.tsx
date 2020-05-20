import React from "react";

import { Link } from "react-router-dom";
import { Button, OverlayTheme, OverlayType } from "..";
import { OverlayContextInterface } from "../Overlay";

import { useIntl } from "react-intl";

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => {
  const intl = useIntl();
  return(
  <div className="checkout-login__guest">
    <h3 className="checkout__header">
      {
        intl.formatMessage({
          defaultMessage: "Continue as a guest",
      })}
    </h3>
    <p>
      {
        intl.formatMessage({
          defaultMessage: `If you don’t wish to register an account, don’t worry. You can checkout as a guest. We care about you just as much as any registered user.`,
          description: "checkout guest paragraph",
      })}
    </p>
    <Link to={checkoutUrl}>
      <Button>
      {
        intl.formatMessage({
          defaultMessage: "Continue as a guest",
      })}
      </Button>
    </Link>

    <p>
      {
        intl.formatMessage({
          defaultMessage: "or you can ",
          description: "continue as a guest guest paragraph",
      })}
      <span
        className="u-link"
        onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
      >
        {
        intl.formatMessage({
          defaultMessage: "create an account",
          description: "continue as a guest guest paragraph",
      })}
        
      </span>
    </p>
  </div>
)};

export default CheckoutAsGuest;
