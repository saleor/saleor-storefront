import React from "react";

import { Link } from "react-router-dom";
import { Button, OverlayTheme, OverlayType } from "..";
import { OverlayContextInterface } from "../Overlay";

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => (
  <div className="checkout-login__guest">
    <h3 className="checkout__header">Continue as a guest</h3>
    <p>
      If you don’t want to register you account at our store don’t worry. You
      can finish your checkout as a guest. You’ll be treated just as good as a
      registered user.
    </p>
    <Link to={checkoutUrl}>
      <Button>Continue as a guest</Button>
    </Link>

    <p>
      or you can{" "}
      <span
        className="u-link"
        onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
      >
        create an account
      </span>
    </p>
  </div>
);

export default CheckoutAsGuest;
