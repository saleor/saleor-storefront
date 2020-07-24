import { styled } from "@styles";

export const Wrapper = styled.div<{ hidden: boolean }>`
  display: ${props => (props.hidden ? "none" : "inherit")};
`;
