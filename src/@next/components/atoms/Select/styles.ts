import { styled } from "@styles";

export const Wrapper = styled.div``;

export const Indicator = styled.div<{ rotate: string }>`
  position: absolute;
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${props =>
    props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)"};
`;

export const Label = styled.label<{ active: boolean; bgColor: string | null }>`
  position: absolute;
  left: ${props => (props.active ? "0.5rem" : "1rem")};
  padding: 0 ${props => (props.active ? 0.5 : 0)}rem;
  background-color: ${props => (props.active ? props.bgColor : "transparent")};
  font-size: ${props =>
    props.active
      ? props.theme.input.labelFontSize
      : props.theme.typography.baseFontSize};
  top: ${props => (props.active ? 0 : "50%")};
  transform: translateY(-50%);
  transition: all 0.3s ease, color 0s;
  pointer-events: none;
`;

export const Option = styled.div`
  background-color: black;
  bottom: "0";
  content: " ";
  height: 1px;
  left: 1rem;
  position: "absolute";
  margin: 0 auto;
  width: 80%;
`;
