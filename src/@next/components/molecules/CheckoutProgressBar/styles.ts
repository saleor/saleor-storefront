import { styled } from "@styles";

export const Step = styled.div`
  flex: 1 1 auto;
  text-align: center;
  position: relative;
`;

export const Dot = styled.div<{ done?: boolean }>`
  position: absolute;
  bottom: 35px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  border: 6px solid ${props => (props.done ? "#06847B" : "#c2c2c2")};
`;

export const ActiveDot = styled(Dot)`
  bottom: 31px;
  border: 4px solid #c2c2c2;
  width: 20px;
  height: 20px;
  background-color: #06847b;
`;

export const ProgressBar = styled.div<{ done?: boolean }>`
  position: absolute;
  z-index: -1;
  bottom: 39px;
  width: 100%;
  height: 4px;
  background-color: ${props => (props.done ? "#06847B" : "#c2c2c2")};
`;

export const LeftBar = styled(ProgressBar)`
  width: 50%;
  left: 0;
`;
export const RightBar = styled(ProgressBar)`
  width: 50%;
  right: 0;
`;

export const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  position: relative;

  ${Step}:first-of-type {
    text-align: left;
    ${Dot} {
      margin-left: 4px;
    }
    ${ProgressBar} {
      width: calc(100% - 10px);
      right: 0;
      margin-left: 10px;
    }
  }

  ${Step}:last-of-type {
    text-align: right;
    ${Dot} {
      margin-right: 4px;
    }
    ${ProgressBar} {
      width: calc(100% - 10px);
      left: 0;
      margin-right: 10px;
    }
  }
`;
