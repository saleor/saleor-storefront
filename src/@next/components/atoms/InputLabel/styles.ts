import { styled } from "@styles";

export const Label = styled.label<{
  active: boolean;
  labelBackground: string | null;
}>`
  position: absolute;
  left: ${props => (props.active ? "0.5rem" : "1rem")};
  padding: 0 ${props => (props.active ? 0.5 : 0)}rem;
  background-color: ${props =>
    props.active ? props.labelBackground : "transparent"};
  font-size: ${props =>
    props.active
      ? props.theme.input.labelFontSize
      : props.theme.typography.baseFontSize};
  top: ${props => (props.active ? 0 : "50%")};
  transform: translateY(-50%);
  transition: all 0.3s ease, color 0s;
  pointer-events: none;
`;
