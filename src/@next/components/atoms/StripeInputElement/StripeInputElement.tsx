import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from "@stripe/stripe-js";
import React, { ChangeEvent } from "react";
import ReactDOM from "react-dom";

import * as S from "./styles";
import { IProps } from "./types";

import { InputLabel } from "../InputLabel";

// if no background color is provided then the default is rgba(0, 0, 0, 0)
// in this case the default color to cover is white (#fff)
const DEFAULT_COLOR = "#fff";
const getBackgroundColor = (ref: any): string => {
  const el = ReactDOM.findDOMNode(ref);
  if (el && el.parentElement) {
    if (el.nodeName === "BODY") {
      return DEFAULT_COLOR;
    }
    const bgColor = window.getComputedStyle(el.parentElement, null)
      .backgroundColor;

    if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") {
      return bgColor;
    }

    return getBackgroundColor(el.parentElement);
  }
  return DEFAULT_COLOR;
};

/**
 * Example component description.
 */
const StripeInputElement: React.FC<IProps> = ({
  onBlur,
  onFocus,
  contentLeft = null,
  contentRight = null,
  error = false,
  placeholder,
  label,
  onChange,
  type,
  options,
  ...props
}: IProps) => {
  const elementRef = React.useRef(null);
  const [filled, setFilled] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");

  const OPTIONS = {
    ...options,
    style: {
      ...options?.style,
      base: {
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: active && !filled ? "#aaa" : "transparent",
          visibility: active && !filled ? "visible" : "hidden",
        },
        color: "#111",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        fontWeight: "500",
        iconColor: "#c4f0ff",
        ...options?.style?.base,
      },
      invalid: {
        color: "#ffc7ee",
        iconColor: "#ffc7ee",
        ...options?.style?.invalid,
      },
    },
  };

  React.useEffect(() => {
    if (elementRef) {
      const color = getBackgroundColor(elementRef.current);
      setColor(color);
    }
  }, []);

  const handleFocus = React.useCallback(() => {
    setActive(true);
    if (onFocus) {
      onFocus();
    }
  }, [setActive, onFocus]);
  const handleBlur = React.useCallback(() => {
    setActive(false);
    if (onBlur) {
      onBlur();
    }
  }, [setActive, onBlur]);
  const handleStripeElementChange = (
    event:
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent
  ) => {
    setFilled(!event?.empty);
    if (onChange) {
      onChange(event);
    }
  };
  const handleCustomInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilled(!!(event.target?.value && event.target?.value !== ""));
    if (onChange) {
      onChange(event);
    }
  };

  const renderStripeElement = () => {
    switch (type) {
      case "CardNumber":
        return (
          <CardNumberElement
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleStripeElementChange}
            options={OPTIONS}
          />
        );
      case "CardExpiry":
        return (
          <CardExpiryElement
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleStripeElementChange}
            options={OPTIONS}
          />
        );
      case "CardCvc":
        return (
          <CardCvcElement
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleStripeElementChange}
            options={OPTIONS}
          />
        );
      case "PostalCode":
        return (
          <S.Input
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleCustomInputChange}
            name="name"
            type="text"
            placeholder="94115"
            className="StripeElement"
            required
          />
        );
    }
  };

  return (
    <S.Wrapper active={active} error={error} ref={elementRef}>
      {contentLeft && <S.Content>{contentLeft}</S.Content>}
      <S.InputWrapper>
        {renderStripeElement()}
        {label && (
          <InputLabel
            labelBackground={labelBackground}
            active={active || !!filled}
          >
            {label}
          </InputLabel>
        )}
      </S.InputWrapper>
      {contentRight && <S.Content>{contentRight}</S.Content>}
    </S.Wrapper>
  );
};

export { StripeInputElement };
