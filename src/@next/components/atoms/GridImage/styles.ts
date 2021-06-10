import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const Img = styled.img`
  // width: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImgBox = styled.div`
  width: 49%;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const OverLay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #00000040;
  display: flex;
  justify-content: center;
  align-items: center;
`;
