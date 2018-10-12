import * as React from "react";
import { Redirect } from "react-router";

import { GoToCheckout } from "../GoToCheckout";

export default class GoToCart extends GoToCheckout {
  getRedirection() {
    return <Redirect to={`/cart/${this.state.checkoutToken}/`} />;
  }
}
