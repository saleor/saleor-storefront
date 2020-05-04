import { media, styled } from "@styles";

export const Wrapper = styled.div`
  margin: 100px 0 100px 0;

  ${media.mediumScreen`
    margin: 80px 0 80px 0;
  `}
`;

export const TitleFirstLine = styled.h1`
  font-size: ${props => props.theme.typography.h1FontSize};

  ${props => media.mediumScreen`
    font-size: ${props.theme.typography.h2FontSize};
  `}
`;

export const TitleSecondLine = styled.h1`
  font-size: ${props => props.theme.typography.h1FontSize};
  font-weight: bold;

  ${props => media.mediumScreen`
    font-size: ${props.theme.typography.h2FontSize};
  `}
`;

export const HR = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.baseFontColorTransparent};
  margin: 40px 0;
  padding: 0;

  ${media.mediumScreen`
    margin: 30px 0;
  `}
`;

export const Subtitle = styled.p`
  margin: 40px 0;

  ${media.mediumScreen`
    margin: 30px 0;
  `}
`;

export const ContinueButton = styled.div``;
