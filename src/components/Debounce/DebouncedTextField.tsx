import * as React from "react";

import TextField, { TextFieldProps } from "../TextField";
import DebounceChange from "./DebounceChange";

interface DebouncedTextFieldProps extends TextFieldProps {
  time?: number;
  resetValue?: boolean;
}

const DebouncedTextField: React.SFC<DebouncedTextFieldProps> = props => {
  const {
    time,
    resetValue,
    value: originalValue,
    onChange,
    ...textFieldProps
  } = props;
  return (
    <DebounceChange
      resetValue={resetValue}
      debounce={onChange}
      time={time}
      value={originalValue}
    >
      {({ change, value }) => (
        <TextField {...textFieldProps} value={value} onChange={change} />
      )}
    </DebounceChange>
  );
};

DebouncedTextField.defaultProps = {
  time: 500
};

export default DebouncedTextField;
