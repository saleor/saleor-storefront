import * as React from "react";

import TextField, { TextFieldProps } from "../TextField";
import DebounceChange from "./DebounceChange";

interface DebouncedTextFieldProps extends TextFieldProps {
  time?: number;
}

const DebouncedTextField: React.SFC<DebouncedTextFieldProps> = props => {
  const { time, value, onChange, ...textFieldProps } = props;
  return (
    <DebounceChange debounce={onChange} time={time} value={value}>
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
