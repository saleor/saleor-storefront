import * as React from "react";

import { FormError } from "../Form";

import "./scss/index.scss";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FormError[];
  helpText?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const TextField: React.SFC<TextFieldProps> = ({
  label = "",
  iconLeft,
  iconRight,
  errors,
  helpText,
  ...rest
}) => (
  <div className="input">
    {label ? <span className="input__label">{label}</span> : null}
    {iconLeft ? <span className="input__icon-left">{iconLeft}</span> : null}
    {iconRight ? <span className="input__icon-right">{iconRight}</span> : null}
    <input
      {...rest}
      className={`input__field${
        errors && errors.length ? " input__field--error" : ""
      }${iconLeft ? " input__field--left-icon" : ""}`}
    />
    {errors && (
      <span className="input__error">
        {errors.map(error => error.message).join(" ")}
      </span>
    )}
    {helpText && <span className="input__help-text">{helpText}</span>}
  </div>
);

export default TextField;
