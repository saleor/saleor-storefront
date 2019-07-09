import React from "react";

import { Icon, IconButton } from "@components/atoms";
import { TextField } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const SearchTextField: React.FC<IProps> = ({
  onBlur,
  onChange,
  onReset,
  value = "",
}: IProps) => {
  return (
    <S.Wrapper>
      <TextField
        autoFocus
        contentLeft={<IconButton name="x" onClick={onReset} />}
        contentRight={<Icon name="search" />}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Search"
      />
    </S.Wrapper>
  );
};
