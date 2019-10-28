import React from "react";

import * as S from "./styles";

export const DemoBanner: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Link target="_blank" href="https://pwa.saleor.io/dashboard/">
        See the GraphQL-first <S.TextEmphasis>dashboard</S.TextEmphasis>
      </S.Link>
    </S.Wrapper>
  );
};
