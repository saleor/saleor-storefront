import styled from "styled-components";

export const WrapperContainer = styled.div`
  width: 60%;
  @media screen and (max-width: 1080px) {
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Title = styled.h3`
  border-top: 2px solid #ff751e;
  padding: 10px 15px;
  color: #f8c158;
  font-size: 20px;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  // border-left: 1px solid #d3d3d3;
  // border-right: 1px solid #d3d3d3;
  // border-top: 1px solid #d3d3d3;
`;

export const Item = styled.div`
  max-width: 25%;
  padding: 0 20px 15px 20px;
  border-right: 1px solid #d3d3d3;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
  &:nth-child(n + 5) {
    border-top: none;
  }
  &:nth-child(4n + 1) {
    border-left: 1px solid #d3d3d3;
  }
  @media screen and (max-width: 1080px) {
    max-width: 50%;
    &:nth-child(4n + 3) {
      border-left: 1px solid #d3d3d3;
    }
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    border: 1px solid #d3d3d3;
  }
`;

export const ImgBox = styled.div`
  height: 200px;
  max-width: 100%;
  margin: 10px 0;
  overflow: hidden;
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  &:hover {
    transform: scale(1.2);
  }
  transition: 0.3s;
`;

export const NameProduct = styled.a`
  font-weight: lighter;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: red;
  }
  display: block;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TabBox = styled.div`
  display: flex;
`;

export const PriceBox = styled.div`
  margin-top: 10px;
`;

export const Price = styled.p`
  font-size: 15px;
  font-weight: 750;
`;

export const Type = styled.span`
  color: #888888;
  font-size: 12px;
`;

export const Tab = styled.p`
  padding: 3px;
  font-size: 12px;
  background: #fff0e6;
  color: #ff751e;
  border-radius: 5px;
  margin-right: 3px;
`;
