import React from "react";

import { PasswordTile } from "../../molecules";
import * as S from "./styles";
import { IProps } from "./types";

export const AccountTab: React.FC<IProps> = ({  }: IProps) => {
  return (
    <S.Wrapper>
      <PasswordTile />
    </S.Wrapper>
  );
};
