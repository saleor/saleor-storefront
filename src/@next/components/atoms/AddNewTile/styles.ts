import { styled } from "@styles";

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-transform: uppercase;
  font-size: ${props => props.theme.typography.h4FontSize};

  p {
    margin: 0;
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;
