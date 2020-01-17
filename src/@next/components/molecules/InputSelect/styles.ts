import { styled } from "@styles";

export const Wrapper = styled.div``;

export const DropdownIndicator = styled.div<{ rotate: string }>`
  position: absolute;
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${props =>
    props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)"};
`;

export const ClearIndicator = styled.div`
  position: absolute;
  right: 1rem;
`;
