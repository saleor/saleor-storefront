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
  address,
  onChange,
  checked,
  ...props
}: IProps) => {
  return (
    <S.Label checked={!!checked}>
      <Address {...address} />
      <S.Input
        {...props}
        type="radio"
        name={inputName}
        value={id}
        checked={checked}
        onChange={onChange}
      />
    </S.Label>
  );
};

export { AddressTileOption };
