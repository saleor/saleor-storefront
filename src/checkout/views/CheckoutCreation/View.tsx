import * as React from "react";

import Provider from "../../provider";

class View extends React.PureComponent<{}> {
  localStorageKey = "checkoutToken";

  get cartLines() {
    return [];
  }

  getRedirectUrl() {
    return "";
  }

  render() {
    return (
      <Provider>
        <h3>CHECKOUT</h3>
      </Provider>
    );
  }
}

export default View;
