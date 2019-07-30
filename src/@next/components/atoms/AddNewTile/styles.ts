import { styled } from "@styles";

export const Content = styled.div`
  text-transform: uppercase;
  font-size: ${props => props.theme.typography.h4FontSize};
  text-align: center;
  vertical-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    margin: 0;
    margin-bottom: calc(${props => props.theme.spacing.spacer} / 3);
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;
