import "./scss/index.scss";

import * as React from "react";
import Select from "react-select";
// tslint:disable
import { Props as SelectProps } from "react-select/lib/Select";

type Style = "white" | "grey";

export interface SelectValue {
  label: string;
  value: string;
}

export interface SelectFieldProps<TValue> extends SelectProps<TValue> {
  label?: string;
  styleType?: Style;
}

type GenericSelectField<TValue> = React.StatelessComponent<
  SelectFieldProps<TValue>
>;

const SelectField: GenericSelectField<SelectValue> = ({
  label = "",
  styleType = "white",
  ...rest
}) => (
  <div
    className={`react-select-wrapper ${
      styleType === "grey" ? "react-select-wrapper--grey" : ""
    }`}
  >
    {label ? <span className="input__label">{label}</span> : null}
    <Select classNamePrefix="react-select" {...rest} />
  </div>
);

export default SelectField;
