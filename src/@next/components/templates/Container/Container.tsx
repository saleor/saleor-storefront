import { media, styled } from "@styles";

export const Container = styled.div`
  width: ${props => `${props.theme.container.width}px`};
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.spacer};

  ${media.largeScreen`
    width: 100%;      
  `}
`;
