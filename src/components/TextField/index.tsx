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

const TextField: React.FC<TextFieldProps> = ({
  label = "",
  iconLeft,
  iconRight,
  errors,
  helpText,
  ...rest
}) => (
  <div className="input">
    {iconLeft ? <span className="input__icon-left">{iconLeft}</span> : null}
    {iconRight ? <span className="input__icon-right">{iconRight}</span> : null}
    <div className="input__content">
      <input
        {...rest}
        className={`input__field${
          errors && errors.length ? " input__field--error" : ""
        }${iconLeft ? " input__field--left-icon" : ""}`}
      />
      {label ? <span className="input__label">{label}</span> : null}
    </div>
    {errors && (
      <span className="input__error">
        {errors.map(error => error.message).join(" ")}
      </span>
    )}
    {helpText && <span className="input__help-text">{helpText}</span>}
  </div>
);

export default TextField;
