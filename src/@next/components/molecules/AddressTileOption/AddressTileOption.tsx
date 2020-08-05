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
  testingContext,
  ...props
}: IProps) => {
  return (
    <S.Label
      checked={!!checked}
      data-test={
        testingContext ? `${testingContext}AddressTile` : `addressTile`
      }
      data-test-id={id}
    >
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
