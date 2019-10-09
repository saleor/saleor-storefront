import { styled } from "@styles";

export const Wrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const SortLine = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
`;

export const Value = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Indicator = styled.div<{ rotate: string }>`
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${props =>
    props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)"};
`;
