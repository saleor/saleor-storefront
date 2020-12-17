import React, { useEffect } from "react";
import { Button } from "../../atoms/Button";
import { IProps } from "./types";

const AuthorizeNetPaymentGateway: React.FC<IProps> = ({
  processPayment,
}: IProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://jstest.authorize.net/v3/AcceptUI.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    (window as any).authorizeNetHandler = (event: any) => {
      if(event.opaqueData.dataValue) {
        processPayment(event.opaqueData.dataValue);
      } else {
        window.alert("Payment did not go through");
      }
    };

    return () => {
      (window as any).authorizeNetHandler = null;
    };
  });

  return (
    <>
      <Button
        type="button"
        className="AcceptUI"
        data-billingaddressoptions='{"show":true, "required":false}'
        data-apiloginid="7p4qn9R3X77q"
        data-clientkey="362gZ5UGg4yGL4U88ZS9yJyCq5CSuaYPKTJdAM9RyBspFgfxWxB2DJgz9HwyV4Xz"
        data-acceptuiformbtntxt="Submit"
        data-accepteadertxt="Card Information"
        data-paymentoptions='{"showCreditCard": true, "showBankAccount": false}'
        data-responsehandler="authorizeNetHandler"
      >
        Add Credit Card
      </Button>
    </>
  );
};

export default AuthorizeNetPaymentGateway;
