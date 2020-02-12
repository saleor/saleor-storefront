import React from "react";
import Media from "react-responsive";

import { mediumScreen } from "@styles/constants";

import LogoSmall from "../../../../images/logo-small.svg";
import * as S from "./styles";

export const DemoBanner: React.FC = () => {
  return (
    <S.Wrapper>
      <S.BorderedWrapper>
        <a target="_blank" href="https://saleor.io/">
          <S.LogoWrapper path={LogoSmall} />
        </a>
        <S.LinkList>
          <Media maxWidth={mediumScreen}>
            <S.Link
              target="_blank"
              href="https://pwa.demo.saleor.rocks/graphql/"
            >
              <S.TextEmphasis>API</S.TextEmphasis>
            </S.Link>
            <S.Divider />
            <S.Link target="_blank" href="https://pwa.saleor.io/dashboard/">
              <S.TextEmphasis>Dashboard</S.TextEmphasis>
            </S.Link>
          </Media>
          <Media minWidth={mediumScreen}>
            <S.Link target="_blank" href="https://pwa.saleor.io/dashboard/">
              Explore <S.TextEmphasis>Store’s dashboard</S.TextEmphasis>
            </S.Link>
            <S.Divider />
            <S.Link
              target="_blank"
              href="https://pwa.demo.saleor.rocks/graphql/"
            >
              Play with <S.TextEmphasis>GraphQL API</S.TextEmphasis>
            </S.Link>
          </Media>
        </S.LinkList>
      </S.BorderedWrapper>
    </S.Wrapper>
  );
};
