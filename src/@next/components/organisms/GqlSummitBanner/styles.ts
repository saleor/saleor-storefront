import { media, styled } from "@styles";

const GQL_COLOR = "#290f57";

export const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: ${GQL_COLOR};
  width: 100%;
  padding: 15px 20px;

  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0.05em;
  color: #fff;
`;

export const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px 30px;

  img {
    width: 60px;
    user-select: none;
    margin-right: 20px;
  }

  ${media.smallScreen`
    margin: 0;
    flex-direction: column;

    img {
      margin-right: 0;
      margin-bottom: 15px;
    }
  `}
`;

export const Text = styled.span`
  display: block;
  margin: 12px 0;
`;

export const HelperText = styled(Text)`
  display: block;
  margin: 12px 15px;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const Panel = styled(Flex)`
  ${media.smallScreen`
    margin-top: 10px;
  `}
`;

export const SquareButton = styled.button<{ selected?: boolean }>`
  border: 2px solid #ffffff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${({ selected }) => (selected ? GQL_COLOR : "#fff")};
  background-color: ${({ selected }) => selected && "#fff"};
  margin-left: 10px;
  height: 36px;
  width: 36px;
  transition: 0.3s;

  &:hover {
    background-color: #fff;
    color: ${GQL_COLOR};
  }
`;

export const BaseButton = styled(SquareButton)`
  width: 72px;
`;
