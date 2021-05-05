import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  @media screen and (max-width: 1080px) {
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }

  margin: 0 auto;
  margin-top: 20px;
`;

export const StoreName = styled.h3`
  color: ${props => props.color};
  text-transform: uppercase;
`;
