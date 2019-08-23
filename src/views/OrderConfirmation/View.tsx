import "./scss/index.scss";

import React from "react";
import { generatePath, Link, RouteComponentProps } from "react-router-dom";

import { Button, NotFound } from "../../components";
import { BASE_URL } from "../../core/config";
import { guestOrderDetailsUrl } from "../../routes";

const View: React.FC<RouteComponentProps> = ({
  history: {
    location: { state },
    replace,
  },
}) => {
  React.useEffect(() => {
    /**
     * Clear router state on leaving the page to ensure view becames unavailable
     * after leaving.
     */
    return () => {
      if (state) {
        replace({ ...location, state: undefined });
      }
    };
  }, []);

  /**
   * Token or id is passed from review page via router state. If it is not
   * present page should not be displayed.
   */
  if (!state) {
    return <NotFound />;
  }

  const { token } = state;
  const orderDetailsRef = generatePath(guestOrderDetailsUrl, { token });

  return (
    <div className="order-confirmation">
      <h3>
        Thank you for <br /> your order!
      </h3>
      <p className="order-confirmation__info">
        We’ve emailed you an order confirmation.
        <br />
        We’ll notify you when the order has been
        <br />
        shipped.
      </p>
      <div className="order-confirmation__actions">
        <Link to={BASE_URL}>
          <Button secondary>Continue Shopping</Button>
        </Link>
        <Link to={orderDetailsRef}>
          <Button>Order Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default View;
