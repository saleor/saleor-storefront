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
  onSelect,
  selected,
}: IProps) => {
  return (
    <S.Wrapper selected={selected}>
      <label>
        <Address {...address} />
        <S.LabeledInput selected={selected}>
          <input
            type="radio"
            name={inputName}
            value={id}
            checked={selected}
            onChange={onSelect}
          />{" "}
          <span>
            <span></span>
          </span>
          {label}
        </S.LabeledInput>
      </label>
    </S.Wrapper>
  );
};

export { AddressTileOption };
