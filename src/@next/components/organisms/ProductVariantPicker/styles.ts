import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 23px;
`;
export const SelectIndicator = styled.div`
  margin: 0 1rem 0 0;
  cursor: pointer;
`;

export const LabelOption = styled.p`
  font: normal normal normal 16px/18px Arial;
  letter-spacing: 0.18px;
  color: #000000;
  opacity: 1;
  line-height: 27px;
`;

export const ListOptions = styled.ul`
  display: flex;
  justify content:flex-star;
  width: 100%;
`;

export const WrapperList = styled.div`
  padding-left: 77px;
  display: flex;
  position: relative;
  width: 100%;
  min-height: 27px;
  align-item: center;
`;

export const OptionItem = styled.li`
  cursor: pointer;
  z-index: 10;
  margin-right: 12px;
  height: 100%;
  padding: 5px 20px;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.13px;
  color: #000000;
  opacity: 1;
  text-align: center;
  border: 0.30000001192092896px solid rgba(112, 112, 112, 0.4);
  &:hover {
    border: 0.30000001192092896px solid #188c72;
  }
`;
