import React from "react";

import { Address, Radio } from "@components/atoms";

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
  ...props
}: IProps) => {
  return (
    <S.Label checked={!!checked}>
      <Address {...address} />
      <S.RadioWrapper>
        <Radio
          {...props}
          name={inputName}
          value={id}
          checked={checked}
          onChange={onChange}
          customLabel={true}
        >
          {label}
        </Radio>
      </S.RadioWrapper>
    </S.Label>
  );
};

export { AddressTileOption };
