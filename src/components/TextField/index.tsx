import * as React from "react";

import "./scss/index.scss";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helpText?: string;
  label?: string;
  icon?: React.ReactNode;
}

const TextField: React.SFC<TextFieldProps> = ({
  label = "",
  icon,
  error,
  helpText,
  ...rest
}) => (
  <div className="input">
    {label ? <span className="input__label">{label}</span> : null}
    {icon ? <span className="input__icon">{icon}</span> : null}
    <input
      {...rest}
      className={`input__field${error ? " input__field--error" : ""}`}
    />
    {error && <span className="input__error">{error}</span>}
    {helpText && <span className="input__help-text">{helpText}</span>}
  </div>
);

export default TextField;
