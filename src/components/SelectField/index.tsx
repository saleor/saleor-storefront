import * as React from "react";
import Select from "react-select";
// tslint:disable
import { Props as SelectProps } from "react-select/lib/Select";

import "./scss/index.scss";

interface SelectValue {
  label: string;
  value: string;
}

interface SelectFieldProps<TValue> extends SelectProps<TValue> {
  label?: string;
}

type GenericSelectField<TValue> = React.StatelessComponent<
  SelectFieldProps<TValue>
>;

const SelectField: GenericSelectField<SelectValue> = ({
  label = "",
  ...rest
}) => (
  <div className="react-select-wrapper">
    {label ? <span className="input__label">{label}</span> : null}
    <Select classNamePrefix="react-select" {...rest} />
  </div>
);

export default SelectField;
