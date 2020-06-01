import { styled } from "@styles";

export const Wrapper = styled.div`
  line-height: 1.6;
  font-size: ${props => props.theme.typography.h4FontSize};

  strong {
    font-weight: ${props => props.theme.typography.boldFontWeight};
    display: inline-block;
  }
`;
