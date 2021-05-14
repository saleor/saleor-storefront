import styled from "styled-components";

import { black } from "@styles/constants";

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
  color: #888888;
  font-weight: 500;
  margin-bottom: 50px;
  padding: 0 15px;
`;

export const Text = styled.p`
  font-size: 1rem;
  display: inline-block;
  margin: 0;

  font-weight: lighter;
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
