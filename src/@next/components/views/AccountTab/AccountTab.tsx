import React from "react";

import { AccountTile, PasswordTile } from "@components/molecules";
import * as S from "./styles";

export const AccountTab: React.FC = () => {
  return (
    <S.Wrapper>
      <AccountTile />
      <PasswordTile />
    </S.Wrapper>
  );
};
