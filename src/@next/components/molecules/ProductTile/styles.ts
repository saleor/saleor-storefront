import { css } from "styled-components";

import { styled } from "@styles";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Title = styled.h4`
  text-transform: uppercase;
  font-weight: normal;
  ${textProps}
`;

// export const Price = styled.p`
//   ${textProps}
// `;

export const Image = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;

  > img {
    flex-grow: 1;
    object-fit: contain;
  }
`;

// test
export const Wrapper = styled.div`
  background-color: white;
  border-radius: 3px;
  cursor: pointer;
  padding: 12px;
  transition: 0.3s ease;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const ImgContainer = styled.div`
  background-color: #f1f5f5;
  display: flex;
  height: 250px;
  justify-content: center;
  img {
    object-fit: contain;
    max-width: 100%;
  }
`;

export const ProductInfo = styled.div``;

export const NameProduct = styled.h4`
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 1rem;
  text-align: left;
`;
export const Price = styled.p`
  font-size: 1rem;
  margin: 1rem 0 0;
`;
export const Category = styled.p`
  font-size: 18px;
  font-weight: 600;
  padding: 0 0 15px 0;
`;
