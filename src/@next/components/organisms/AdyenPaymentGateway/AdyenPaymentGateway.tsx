import React, { useEffect, useRef, useState } from "react";

import {
  IFormError,
  IPaymentGatewayConfig,
  IPaymentGatewayHandlers,
} from "@types";
import * as S from "./styles";

export interface IProps {
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLDivElement>;
  /**
   * Errors returned by the payment gateway.
   */
  errors?: IFormError[];
  gatewayHandlers?: IPaymentGatewayHandlers;
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: () => void;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
  gatewayRef: React.RefObject<HTMLDivElement>;
}

const AdyenPaymentGateway: React.FC<IProps> = ({
  config,
  formRef,
  gatewayHandlers,
  processPayment,
  onError,
  gatewayRef,
}: IProps) => {
  const [dropin, setDropin] = useState<any>();
  const [hidden, setHidden] = useState<boolean>(false);

  // useEffect(() => {
  //   const dropinElement = gatewayHandlers?.handlers;
  //   console.log("gatewayHandlers dropinElement", gatewayHandlers);
  //   if (dropinElement) {
  //     dropinElement?.mount(gatewayRef.current);
  //     setDropin(dropinElement);
  //   }
  // }, [gatewayHandlers]);

  useEffect(() => {
    console.log("dropin event listener useEffect", formRef, dropin);
    (formRef?.current as any).addEventListener("submit", () => {
      console.log("dropin event submit", dropin);
      // if (dropin) {
      // ref.current.dispatchEvent(new Event("submit", { cancelable: true }));
      console.log("dropin event submit dropin");
      // dropin.submit();
      processPayment();
      // }
    });
  }, [formRef]);

  return (
    <S.Wrapper hidden={hidden}>
      <div ref={formRef} />
    </S.Wrapper>
  );
};

export { AdyenPaymentGateway };
