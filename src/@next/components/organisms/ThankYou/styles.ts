import { DefaultTheme, media, styled } from "@styles";

export const Wrapper = styled.div`
  margin: 80px 0;

  ${media.smallScreen`
    margin: 40px 0;
  `}
`;

export const ThankYouHeader = styled.p`
  font-size: ${props => props.theme.typography.ultraBigFontSize};
  margin: 0;
  line-height: 110%;
  span {
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
  padding-bottom: 40px;
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  margin-bottom: 40px;

  ${media.smallScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h1FontSize};
  `}
`;

export const Paragraph = styled.p`
  font-size: ${props => props.theme.typography.h4FontSize};
  margin: 0;
  line-height: 170%;

  span {
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;

export const Buttons = styled.div`
  width: 50%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  button {
    padding-left: 0;
    padding-right: 0;
  }

  ${media.smallScreen`
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
    width: 100%;
    margin-top: 20px;
  `}
`;
