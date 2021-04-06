import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 170px;
  min-height: 100vh;
  background: #e8e8e8;
  flex-wrap: wrap;

  @media (max-width: 1380px) {
    padding: 0 80px;
  }
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 40px;
  }
`;

export const ListProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
`;

export const FlexItem = styled.div`
  width: 20%;

  @media (max-width: 1600px) {
    width: 25%;
  }
  @media (max-width: 1368px) {
    width: 33.3%;
  }
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
