import { styled } from "@styles";

export const Dot = styled.div<{ done?: boolean }>`
  position: relative;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  border: 6px solid ${props => (props.done ? "#06847B" : "#c2c2c2")};
`;

export const ActiveDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #c2c2c2;
`;

export const Label = styled.span`
  white-space: pre;
  display: block;
  position: absolute;
  top: 35px;
  transform: translateX(-50%);
  font-size: ${[props => props.theme.typography.smallFontSize]};
  letter-spacing: 2%;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
`;

export const LeftLabel = styled(Label)`
  transform: none;
  top: 35px;
`;
export const RightLabel = styled(Label)`
  transform: none;
  top: 35px;
  right: 0;
`;

export const ProgressBar = styled.div<{ done?: boolean }>`
  z-index: -1;
  width: 100%;
  height: 4px;
  background-color: ${props => (props.done ? "#06847B" : "#c2c2c2")};
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-child) {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
