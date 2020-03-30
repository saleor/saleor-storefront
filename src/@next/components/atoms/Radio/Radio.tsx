import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Radio input.
 */
const Radio: React.FC<IProps> = ({
  checked,
  name,
  value,
  onChange,
  children,
  customLabel = false,
}: IProps) => {
  const StyledInput = customLabel ? S.Input : S.LabeledInput;

  return (
    <StyledInput checked={checked}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />{" "}
      <div>
        <span></span>
      </div>
      {children}
    </StyledInput>
  );
};

export { Radio };
