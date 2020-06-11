import React from "react";

import { Link } from "react-router-dom";
import { Button, OverlayTheme, OverlayType } from "..";
import { OverlayContextInterface } from "../Overlay";

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => (
  <div className="checkout-login__guest">
    <h3 className="checkout__header">Kontynuuj jako gość</h3>
    <p>
      Jeżeli nie chcesz zakładać konta, nie ma sprawy. Możesz kontynować zamówienie jako gość. 
      Dbamy o Twoje zamówienie, tak jak o każdego zalogowanego użytkownika.
    </p>
    <Link to={checkoutUrl}>
      <Button dataCy="checkoutLoginContinueAsGuestButton">Kontynuuj jako gość</Button>
    </Link>

    <p>
      możesz również{" "}
      <span
        data-cy="showRegisterOverlay"
        className="u-link"
        onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
      >
        stworzyć nowe konto użytkownika
      </span>
    </p>
  </div>
);

export default CheckoutAsGuest;
