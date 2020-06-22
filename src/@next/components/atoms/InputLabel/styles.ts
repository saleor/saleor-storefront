import { styled, DefaultTheme } from "@styles";

export const activeLabelStyles = (
  theme: DefaultTheme,
  labelBackground: string | null
) => `
  left: 0.5rem;
  padding: 0 0.5rem;
  background-color: ${labelBackground};
  font-size: ${theme.input.labelFontSize};
  top: 0;
`;

const labelStyles = (theme: DefaultTheme) => `
  left: 1rem;
  padding: 0 0rem;
  background-color: transparent;
  font-size: ${theme.typography.baseFontSize};
  top: 50%;
`;

export const Label = styled.label<{
  active: boolean;
  labelBackground: string | null;
}>`
  position: absolute;
  ${props =>
    props.active
      ? activeLabelStyles(props.theme, props.labelBackground)
      : labelStyles(props.theme)};
  transform: translateY(-50%);
  transition: all 0.3s ease, color 0s;
  pointer-events: none;
`;
