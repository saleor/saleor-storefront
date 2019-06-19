import { DefaultTheme, styled } from "@styles";
import { gray, grayDark } from "@styles/constants";

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
    return gray;
  }

  if (error) {
    return theme.colors.errorColor;
  }

  if (hovered) {
    return theme.colors.secondaryColor;
  }

  return active ? theme.colors.secondaryColor : grayDark;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border: 1.5px solid ${props => getEdgeColor(props)};
  color: ${props => getEdgeColor(props)};
  outline: ${props =>
    props.active ? `1px solid ${getEdgeColor(props)};` : "none"};
  transition: all 0.3s ease;

  &:hover {
    color: ${props => getEdgeColor(props, true)};
    outline-width: ${props => (props.disabled ? 0 : 1)}px;
    outline-style: solid;
    border-color: ${props => getEdgeColor(props, true)};
    outline-color: ${props => getEdgeColor(props, true)};
  }
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  padding: 0.8rem 1rem;
  margin: 0;
  border: none;
  width: 100%;
  font-size: ${props => props.theme.typography.baseFontSize};
  outline: none;
  background-color: transparent;
`;

export const Label = styled.label<{ active: boolean }>`
  position: absolute;
  left: 1rem;
  padding: 0 ${props => (props.active ? 10 : 0)}px;
  background-color: ${props => (props.active ? "#fff" : "none")};
  font-size: ${props =>
    props.active
      ? props.theme.typography.smallFontSize
      : props.theme.typography.baseFontSize};
  top: ${props => (props.active ? 0 : "50%")};
  transform: translateY(-50%);
  transition: all 0.3s ease, color 0s;
  pointer-events: none;
`;
