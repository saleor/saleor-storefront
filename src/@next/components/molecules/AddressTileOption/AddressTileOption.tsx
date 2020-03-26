import React from "react";

import { Address } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Address tile option.
 */
const AddressTileOption: React.FC<IProps> = ({
  id,
  inputName,
  label,
  address,
  onChange,
  checked,
}: IProps) => {
  return (
    <S.Label checked={checked}>
      <Address {...address} />
      <S.LabeledInput checked={checked}>
        <input
          type="radio"
          name={inputName}
          value={id}
          checked={checked}
          onChange={onChange}
        />{" "}
        <div>
          <span></span>
        </div>
        {label}
      </S.LabeledInput>
    </S.Label>
  );
};

export { AddressTileOption };
