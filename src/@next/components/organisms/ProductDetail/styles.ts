import styled from "styled-components";

import { black, mainColorPage } from "@styles/constants";

export const Wraper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${black};
`;

export const ImgSlide = styled.div`
  width: 40%;
  @media (max-width: 1380px) {
    width: 50%;
  }
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 414px) {
    width: 100%;
  }
`;

export const InfoDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  // padding: 0 30px;
  box-sizing: border-box;
`;

export const ProductName = styled.h3`
  // color: #888888;
  // font-weight: 500;
  margin-bottom: 20px;
  // padding: 0 15px;

  font: normal normal bold 18px/12px Arial;
  letter-spacing: 0.2px;
  color: #000000;
  opacity: 1;
`;

export const ProductReview = styled.div`
  display: flex;
  align-item: flex-start;
`;

export const Text = styled.p`
  font-size: 1rem;
  display: inline-block;
  margin: 0;

  font-weight: lighter;
`;

export const RateNumber = styled.span`
  font: normal normal normal 22px/26px Arial;
  letter-spacing: 0.24px;
  color: #188c72;
  opacity: 1;
  margin-right: 1px;
`;

export const RateComment = styled.span`
  display: flex;
  align-items: center;
  font: normal normal normal 15px/17px Arial;
  letter-spacing: 0.17px;
  color: #909090;
  opacity: 1;
  margin-left: 4.5px;
`;
export const PriceProduct = styled.p`
  margin-top: 16px;
  line-height: 30px;
  font-weight: 100;
  font: normal normal normal 26px/13px Arial;
  letter-spacing: 0.29px;
  color: #188c72;
  opacity: 1;
`;

export const StrongerText = styled.p`
  font-weight: 700;
  color: #000;
  font-size: 1rem;
  display: inline-block;
  margin: 0;

  font-weight: lighter;
`;

export const Link = styled.a`
  color: #74b9ff;
`;

export const PriceContainer = styled.div`
  display: flex;
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  padding: 15px;
  margin: 15px 0;
`;

export const PriceBox = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
`;

export const Table = styled.table`
  border: 1px solid grey;
  border-collapse: collapse;
  font-weight: bold;
  margin: 0;
  // min-width: 3rem;
`;

export const Td = styled.td`
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 8px 12px;
  font-size: 1rem;
  @media (max-width: 1024px) {
    font-size: 0.7rem;
  }
`;

export const Tr = styled.tr``;

export const FlexWraper = styled.div`
  display: flex;
  padding: 4px 0;
`;

export const LogoIcon = styled.img`
  width: auto;
  height: 23px;
  border: 1px solid #f2f2f2;
  margin-left: 5px;
`;

export const Popup = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #00000050;
`;

export const LabelOption = styled.p`
  font: normal normal normal 16px/18px Arial;
  letter-spacing: 0.18px;
  color: #000000;
  opacity: 1;
  line-height: 27px;
`;

export const BoxOptionWeight = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 27px;
  border: 0.30000001192092896px solid rgba(112, 112, 112, 0.4);
  margin-right: 14px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border: 0.30000001192092896px solid #188c72;
  }
`;

export const WrapperTypeProduct = styled.div`
  position: relative;
  margin-top: 22px;
  width: 100%;
  height: 27px;
  display: flex;
  align-item: center;
`;

export const WrapperCountProduct = styled.div`
  position: relative;
  display: flex;
  margin-top: 23px;
  width: 100%;
  height: 27px;
`;

export const WrapperOption = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  margin-left: 112px;
`;

export const TextOptionWeight = styled.p`
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.13px;
  color: #000000;
  opacity: 1;
`;

export const ChangeCountWrapper = styled.div`
  display: flex;
  width: 88px;
  height: 26px;
  border: 0.30000001192092896px solid rgba(112, 112, 112, 0.4);
  border-radius: 2px;
  opacity: 1;
`;

export const ChangeCount = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 2px;
  opacity: 1;
  cursor: pointer;
`;

export const CountProduct = styled.div`
  height: 26px;
  width: 36px;
  border-left: 0.30000001192092896px solid rgba(112, 112, 112, 0.4);
  border-right: 0.30000001192092896px solid rgba(112, 112, 112, 0.4);
  border-radius: 2px;
  opacity: 1;
`;

export const WrapperOptionBuy = styled.div`
  margin-top: 25px;
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-around;
`;

export const BoxAddTrolley = styled.div`
  height: 100%;
  width: 228px;
  border: 1px solid ${mainColorPage};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${mainColorPage};
  font: normal normal normal 16px/12px Arial;
  letter-spacing: 0.32px;
  cursor: pointer;
`;

export const BoxQuote = styled.div`
  height: 100%;
  width: 185px;
  border: 1px solid ${mainColorPage};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${mainColorPage};
  font: normal normal normal 16px/12px Arial;
  letter-spacing: 0.32px;
  cursor: pointer;
`;
