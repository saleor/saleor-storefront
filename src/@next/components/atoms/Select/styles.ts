import { styled } from "@styles";

export const Wrapper = styled.div`
  position: relative;
`;

export const SelectIcon = styled.div<{
  isOpen: boolean;
}>`
  margin-right: ${props => props.theme.spacing.spacer};
  transition: transform 300ms ease;
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "")};
`;

export const FocusedOption = styled.div<{ selected?: boolean }>`
  margin: 0.5rem auto;
  border-radius: 8px;
  width: 90%;
  min-height: 34px;
  padding: 0.25rem;
  vertical-align: middle;
  display: flex;
  align-items: center;
  :hover {
    background-color: ${props =>
      props.selected ? "" : props.theme.colors.primaryLight};
  }
  background-color: ${props =>
    props.selected ? props.theme.colors.primaryTransparent : ""};
`;

export const SelectOptionsMenu = styled.div`
  border-radius: 0;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.15);
  background-color: white;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  margin-top: calc(${props => props.theme.spacing.spacer}*1.3);
  left: 0;
  width: 100%;
  min-width: 80px;
  min-height: 43px;
  max-height: 40vh;
  overflow: auto;
  z-index: 2;
`;
