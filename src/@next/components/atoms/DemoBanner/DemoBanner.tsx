import React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-responsive";

import { mediumScreen } from "@styles/constants";

import LogoSmall from "../../../../images/logo-small.svg";
import * as S from "./styles";

export const DemoBanner: React.FC = () => {
  return (
    <S.Wrapper>
      <S.BorderedWrapper>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a target="_blank" href="https://saleor.io/">
          <S.LogoWrapper path={LogoSmall} />
        </a>
        <S.LinkList>
          <Media maxWidth={mediumScreen}>
            <S.Link target="_blank" href="https://demo.saleor.io/graphql/">
              <S.TextEmphasis>
                <FormattedMessage defaultMessage="API" />
              </S.TextEmphasis>
            </S.Link>
            <S.Divider />
            <S.Link target="_blank" href="https://demo.saleor.io/dashboard/">
              <S.TextEmphasis>
                <FormattedMessage defaultMessage="Dashboard" />
              </S.TextEmphasis>
            </S.Link>
          </Media>
          <Media minWidth={mediumScreen}>
            <S.Link target="_blank" href="https://demo.saleor.io/dashboard/">
              <FormattedMessage
                defaultMessage="Explore <emphasis>Store’s dashboard</emphasis>"
                values={{
                  emphasis: (children: any) => (
                    <S.TextEmphasis>{children}</S.TextEmphasis>
                  ),
                }}
              />
            </S.Link>
            <S.Divider />
            <S.Link target="_blank" href="https://demo.saleor.io/graphql/">
              <FormattedMessage
                defaultMessage="Play with <emphasis>GraphQL API</emphasis>"
                values={{
                  emphasis: (children: any) => (
                    <S.TextEmphasis>{children}</S.TextEmphasis>
                  ),
                }}
              />
            </S.Link>
          </Media>
        </S.LinkList>
      </S.BorderedWrapper>
    </S.Wrapper>
  );
};
