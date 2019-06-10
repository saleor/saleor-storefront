import { media, styled } from "@styles";

export const Main = styled.button`
  background-color: ${props => props.theme.colors.turquoise};
  transform: skew(45deg);
  padding: 0.9rem 3.7rem;
  border: none;
  box-shadow: -5px 5px 14px 0px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  outline: none;
  font-family: ${props => props.theme.typography.baseFontFamily};
  cursor: pointer;
  color: ${props => props.theme.colors.white};

  &:hover {
    background-color: ${props => props.theme.colors.turquoiseDark};
  }

  &:active {
    box-shadow: -3px 3px 14px 0px rgba(129, 67, 67, 0.2);
  }

  &:disabled {
    background-color: $gray;

    &,
    &:hover {
      cursor: default;
    }
  }

  ${media.phone`
    padding:  0.9rem 1rem;
    width: 88%;
    max-width: 88%;
  `}
`;

export const Secondary = styled(Main)`
  background-color: ${props => props.theme.colors.white};
  box-shadow: inset 0px 0px 0px 3px ${props => props.theme.colors.blue};
  border-left: 1px solid ${props => props.theme.colors.blue};
  border-right: 1px solid ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.blue};

  &:hover {
    background-color: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.white};
  }

  &:active {
    background-color: ${props => props.theme.colors.blueDark};
  }
`;

export const Text = styled.span`
  display: inline-block;
  font-size: 1.125rem;
  text-transform: capitalize;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
  transform: skew(-45deg);
`;
