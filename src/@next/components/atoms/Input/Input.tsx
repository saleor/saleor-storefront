import React from "react";
import ReactDOM from "react-dom";

import { InputLabel } from "../InputLabel";

import * as S from "./styles";
import { IProps } from "./types";

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

export const Input: React.FC<IProps> = ({
  onBlur,
  onFocus,
  contentLeft = null,
  contentRight = null,
  error = false,
  disabled = false,
  placeholder,
  label,
  value,
  onChange,
  ...props
}: IProps) => {
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");

  React.useEffect(() => {
    if (elementRef) {
      const color = getBackgroundColor(elementRef.current);
      setColor(color);
    }
  }, []);

  const handleFocus = React.useCallback(
    e => {
      setActive(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [setActive, onFocus]
  );
  const handleBlur = React.useCallback(
    e => {
      setActive(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [setActive, onBlur]
  );

  return (
    <S.Wrapper
      active={active}
      error={error}
      disabled={disabled}
      ref={elementRef}
    >
      {contentLeft && <S.Content>{contentLeft}</S.Content>}
      <S.InputWrapper>
        <S.Input
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          onChange={onChange}
        />
        {label && (
          <InputLabel
            labelBackground={labelBackground}
            active={active || !!value}
          >
            {label}
          </InputLabel>
        )}
      </S.InputWrapper>
      {contentRight && <S.Content>{contentRight}</S.Content>}
    </S.Wrapper>
  );
};
