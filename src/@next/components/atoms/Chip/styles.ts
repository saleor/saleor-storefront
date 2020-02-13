import { styled } from "@styles";

import { Size } from "./types";

const padding = {
  md: "0.4rem 0.4rem 0.4rem 0.8rem",
  sm: "0.1rem",
};

const paddingCloseButton = {
  md: "0.4rem 0.4rem 0.3rem 0.4rem",
  sm: "0.1rem",
};

const fontSize = (fontSize: string, smallFontSize: string) => ({
  md: fontSize,
  sm: smallFontSize,
});

export const Primary = styled.div<{
  color: "primary" | "secondary";
  fullWidth?: boolean;
  size: Size;
}>`
  background-color: ${props => props.theme.chip.colors[props.color].background};
  padding: ${props => padding[props.size]};
  border: none;
  transition: 0.3s;
  outline: none;
  border-radius: 2rem;
  color: ${props => props.theme.chip.colors[props.color].color};
  width: ${props => (props.fullWidth ? "100%" : "auto")}
  display: inline-block;
  cursor: default;
`;

export const Secondary = styled(Primary)`
  box-shadow: inset 0px 0px 0px 3px
    ${props => props.theme.chip.colors.secondary.color};
  border-left: 1px solid ${props => props.theme.chip.colors.secondary.color};
  border-right: 1px solid ${props => props.theme.chip.colors.secondary.color};
`;

export const Text = styled.span<{ size: Size }>`
  display: inline-block;
  font-size: ${({
    size,
    theme: {
      chip: { typography },
    },
  }) => fontSize(typography.fontSize, typography.smallFontSize)[size]};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
  margin-right: ${props => paddingCloseButton[props.size]};
  vertical-align: middle;
`;

export const CloseButton = styled.button<{
  size: Size;
  color: "primary" | "secondary";
}>`
  padding: ${props => paddingCloseButton[props.size]};
  vertical-align: middle;
  cursor: pointer;
  border-radius: 1rem;

  > svg > path {
    fill: ${props => props.theme.chip.colors[props.color].color};
  }

  &:hover {
    background-color: ${props =>
      props.theme.chip.colors[props.color].hoverBackground};
    > svg > path {
      fill: ${props => props.theme.chip.colors[props.color].hoverColor};
    }
  }

  &:active {
    background-color: ${props =>
      props.theme.chip.colors[props.color].activeBackground};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.disabled};

    &,
    &:hover {
      cursor: default;
    }
  }
`;
