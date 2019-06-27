import { styled } from "@styles";

export const Content = styled.div`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: ${props => props.theme.typography.h4FontSize};

  p {
    margin: 0;
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;
