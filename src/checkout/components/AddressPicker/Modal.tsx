import * as React from "react";
import ReactSVG from "react-svg";

import { Button, ShippingAddressForm } from "../../../components";
import { SUPPORT_EMAIL } from "../../../core/config";

import closeImg from "../../../images/modal-close.svg";

const ShippingUnavailableModal: React.FC<{ hide(): void }> = ({ hide }) => (
  <div className="modal">
    <div className="modal__title">
      <p>We’re not shipping to your country</p>{" "}
      <ReactSVG path={closeImg} className="modal__close" onClick={hide} />
    </div>
    <div className="modal__body">
      <p className="modal__body__lead">We’re not shipping to your country</p>
      <ShippingAddressForm
        buttonText="Continue to Shipping"
        onSubmit={() => null}
      />
    </div>
    <div className="modal__footer">
      <Button className="modal__button" onClick={hide}>
        Ok
      </Button>
    </div>
  </div>
);

export default ShippingUnavailableModal;
