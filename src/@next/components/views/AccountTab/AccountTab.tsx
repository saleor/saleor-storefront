import React from "react";

import { PasswordTile } from "../../molecules";
import * as S from "./styles";

export const AccountTab: React.FC = () => {
  return (
    <S.Wrapper>
      <PasswordTile />
    </S.Wrapper>
  );
};
