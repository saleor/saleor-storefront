import { DefaultTheme, styled } from "@styles";
import { spacer } from "@styles/constants";

import { Style } from "./types";

interface IInputField {
  styleType: Style;
  error: boolean;
  hasLeftIcon: boolean;
}

const focusedLabel = (props: { theme: DefaultTheme }) => `
  font-size: ${props.theme.input.labelFontSize};
  left: 17px;
  top: 0;
`;

const color = (props: { theme: DefaultTheme }) => ({
  grey: props.theme.colors.primaryLightColor,
  white: props.theme.colors.whiteColor,
});

export const Input = styled.div`
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const Label = styled.span<{ error: boolean }>`
  display: inline-block;
  position: absolute;
  color: ${props =>
    props.error ? props.theme.colors.errorColor : props.theme.input.labelColor};
  top: 50%;
  left: 0.8rem;
  transform: translate(0, -50%);
  padding: 0 6px;
  z-index: 1;
  pointer-events: none;
  transition: all 0.4s ease;
`;

export const InputContent = styled.div`
  position: relative;
`;

export const InputField = styled.input<IInputField>`
  display: block;
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: ${props => props.theme.typography.baseFontSize};
  color: ${props => props.theme.colors.baseFontColor};
  border: ${props => `1px solid ${props.theme.colors.secondaryColor}`};
  outline: none;
  box-shadow: ${props => `0 0 0 1px ${props.theme.colors.whiteColor}`};
  ${props => props.hasLeftIcon && `padding-left:${spacer * 3}rem`};
  ${props =>
    props.error &&
    `
    border: 1px solid ${props.theme.colors.errorColor};
    &:focus {
      box-shadow: 0 0 0 1px ${props.theme.colors.errorColor}
    }
    `};
  background-color: transparent;
  &:hover {
    box-shadow: ${props => `0 0 0 1px ${props.theme.colors.secondaryColor}`};
    color: ${props => props.theme.colors.secondaryColor};
    transition: all 0.3s ease;
    & + ${Label} {
      color: ${props => props.theme.colors.secondaryColor};
    }
  }
  &:focus,
  &:not([value=""]) {
    box-shadow: ${props => `0 0 0 1px ${props.theme.colors.secondaryColor}`};
    & + ${Label} {
      color: ${props => props.theme.colors.secondaryColor};
      background-color: ${props => color(props)[props.styleType]};
      ${props => focusedLabel(props)};
    }
  }
  &:-webkit-autofill {
    box-shadow: ${props => `0 0 0 1px ${props.theme.colors.secondaryColor}`};
    & + ${Label} {
      background-color: ${props => color(props)[props.styleType]};
      ${props => focusedLabel(props)};
    }
  }
`;

export const Icon = styled.span<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: ${props =>
    props.position === "left" ? `left:${props.theme.spacing.spacer}` : "auto"};
  left: ${props =>
    props.position === "right"
      ? `right:${props.theme.spacing.spacer}`
      : "auto"};
`;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.errorColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const HelpText = styled.span`
  color: ${props => props.theme.input.labelColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;
