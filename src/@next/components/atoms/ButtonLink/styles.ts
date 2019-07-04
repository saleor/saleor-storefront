import { styled } from "@styles";
import { Color, Size } from "./types";

export const ButtonLink = styled.button<{
  color?: Color;
  size?: Size;
}>`
  font-size: ${({ size, theme: { typography } }) =>
    size === "md" ? typography.baseFontSize : typography.smallFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${({ color, theme: { link } }) =>
    color === "secondary" ? link.secondaryColor : link.baseColor};
  text-decoration: underline;
  background: transparent;
  outline: none;
  border: none;
  box-shadow: none;
  transform: none;
  text-decoration: underline;
  padding: 0;
`;
