import React, { useEffect } from "react";
import { Button } from "../../atoms/Button";
import { IProps } from "./types";

const AuthorizeNetPaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
}: IProps) => {
  const apiLoginId = config.find(obj => obj.field === "api_login_id")?.value;
  const clientKey = config.find(obj => obj.field === "client_key")?.value;
  const useSandbox = config.find(obj => obj.field === "use_sandbox")?.value;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      useSandbox === "true"
        ? "https://jstest.authorize.net/v3/AcceptUI.js"
        : "https://js.authorize.net/v3/AcceptUI.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    (window as any).authorizeNetHandler = (event: any) => {
      if (event.opaqueData.dataValue) {
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
        testingContext="authorizeNetButton"
        data-billingaddressoptions='{"show":true, "required":false}'
        data-apiloginid={apiLoginId}
        data-clientkey={clientKey}
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
