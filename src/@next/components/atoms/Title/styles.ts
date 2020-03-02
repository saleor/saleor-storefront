import { styled, media, DefaultTheme } from "@styles";

export const Wrapper = styled.div`
  font-size: ${props => props.theme.typography.h1FontSize};

  ${media.smallScreen`
  font-size: ${({ theme }: { theme: DefaultTheme }) =>
    theme.typography.h2FontSize};
  `}
`;
