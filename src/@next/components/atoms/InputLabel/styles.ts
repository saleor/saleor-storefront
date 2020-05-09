import { styled } from "@styles";

export const Label = styled.label<{
  active: boolean;
  labelBackground: string | null;
}>`
  position: absolute;
  left: ${props => (props.active ? "0.5rem" : "1rem")};
  padding: 0 ${props => (props.active ? 0.5 : 0)}rem;
  font-size: 10px;
  top: .6rem;
  transform: translateY(-50%);
  transition: all 0.3s ease, color 0s;
  pointer-events: none;
`;
