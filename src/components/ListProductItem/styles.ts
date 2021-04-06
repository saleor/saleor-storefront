import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: white;
  margin: 7px;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 10px;
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const ImgContainer = styled.div`
  max-width: 100%;
  height: 230px;
  padding: 30px 10px;
  margin: 0 auto;
  display: flex;
  align-item: center;
  justify-content: center;
  overflow: hidden;
`;

export const ImgProduct = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

export const ProductInfo = styled.div``;

export const NameProduct = styled.h3`
  font-size: 20px;
  font-weight: lighter;
  white-space: nowrap;
  color: grey;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Price = styled.p`
  font-size: 25px;
  padding: 20px 0;
  margin: 0;
`;
export const Category = styled.p`
  font-size: 18px;
  font-weight: 600;
  padding: 0 0 15px 0;
`;
