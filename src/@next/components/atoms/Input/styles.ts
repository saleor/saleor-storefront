import { DefaultTheme, styled } from "@styles";
import { gray, grayLight } from "@styles/constants";

type WrapperProps = {
  active: boolean;
  error: boolean;
  disabled: boolean;
  theme: DefaultTheme;
};

const getEdgeColor = (
  { active, error, disabled, theme }: WrapperProps,
  hovered = false
) => {
  if (disabled) {
    return grayLight;
  }

  if (error) {
    return theme.colors.errorColor;
  }

  if (hovered) {
    return theme.colors.secondaryColor;
  }

  return active ? theme.colors.secondaryColor : gray;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  padding: 0.8rem 1rem;
  border: 2px solid ${props => getEdgeColor(props)};
  outline: ${props =>
    props.active ? `1px solid ${getEdgeColor(props)};` : "none"};

  &:hover {
    outline-width: ${props => (props.disabled ? 0 : 1)}px;
    outline-style: solid;
    border-color: ${props => getEdgeColor(props, true)};
    outline-color: ${props => getEdgeColor(props, true)};
  }
`;

export const Content = styled.span<{ marginPosition: "left" | "right" }>`
  ${props => `margin-${props.marginPosition}: 0.5rem`}
`;

export const Input = styled.input`
  padding: 0;
  margin: 0;
  border: none;
  width: 100%;
  font-size: ${props => props.theme.typography.baseFontSize};
  outline: none;
  background-color: transparent;
`;
