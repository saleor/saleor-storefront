import * as React from "react";

import { Button, LoginForm, PasswordResetForm } from "..";

class CheckoutShipping extends React.Component<{}, { resetPassword: boolean }> {
  constructor(props) {
    super(props);
    this.state = { resetPassword: false };
  }
  render() {
    return <p>shipping form</p>;
  }
}

export default CheckoutShipping;
