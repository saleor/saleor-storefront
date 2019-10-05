import React from "react";

import { AccountTabTiles } from "@components/molecules";
import * as S from "./styles";

export const AccountTab: React.FC = () => {
  return (
    <S.Wrapper>
      <AccountTabTiles />
    </S.Wrapper>
  );
};
