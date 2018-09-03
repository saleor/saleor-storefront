import * as React from "react";
import Select from "react-select";

import "./scss/index.scss";

interface SelectFieldProps {
  label: string;
}

const SelectField: React.SFC<SelectFieldProps> = ({ label = "", ...rest }) => (
  <div className="react-select-wrapper">
    <span className="input__label">{label}</span>
    <Select classNamePrefix="react-select" {...rest} />
  </div>
);

export default SelectField;
